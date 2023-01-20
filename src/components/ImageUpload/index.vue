<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-preview="preview"
      :class="{ disabled: fileComputed }"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      v-if="showPercent"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress
      v-else
      width="140"
      type="circle"
      :percentage="percent"
    ></el-progress>
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="" style="width: 100%" />
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import COS from "cos-js-sdk-v5"; // 引入腾讯云的包
// 实例化COS对象  只有这个才能进入自己的存储桶
const cos = new COS({
  SecretId: "xxx", // 自己的腾讯云身份识别 ID
  SecretKey: "xxx", //  身份密钥
});
export default {
  name: "ImageUpload",
  data() {
    return {
      // 上传文件的列表 需要数组
      fileList: [],
      // 控制弹层显示
      showDialog: false,
      // 保存点击图片的地址’
      imgUrl: "",
      // 保存最后上传文件的uid
      currentFileUid: "",
      // 控制进度条的进度
      percent: 0,
      // 控制进度条显示隐藏
      showPercent: true,
    };
  },
  methods: {
    // 预览图片 file 点击的文件信息 里面有图片路径
    preview(file) {
      this.showDialog = true;
      this.imgUrl = file.url;
    },
    // 删除图片 file是要删除的文件 fileList是删除后的文件
    handleRemove(file, fileList) {
      //  将原来的数组排除掉
      // this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
      this.fileList = fileList;
    },
    // 添加文件、上传成功和上传失败时都会被调用
    // 添加图片 file是当前文件 fileList是当前最新数组
    // 需要实现上传代码的逻辑 这里才会成功
    changeFile(file, fileList) {
      // if (fileList.length) {
      //   this.fileList.push(file);
      // }
      this.fileList = fileList.map((item) => item);
    },
    // 上传之前的检查 file为上传的文件
    // 若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      // 检查文件类型和文件大小是否合格
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      // types.includes(file.type)
      if (!types.some((item) => item === file.type)) {
        this.$message.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
        // 终止上传
        return false;
      }
      const maxsize = 5 * 1024 * 1024;
      // file.size的单位是b
      if (maxsize < file.size) {
        this.$message.error("图片大小最大不能超过5M");
        return false;
      }
      this.currentFileUid = file.uid;
      // 最后一定要返回出去
      return true;
    },
    // 自定义上传 会覆盖默认上传 这个参数里面有file对象
    upload(params) {
      // console.log(params);
      // 判断有没有这个文件
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: "corn-53-1316590912" /* 填入您自己的存储桶，必须字段 */,
            Region:
              "ap-guangzhou" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file
              .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
            Body: params.file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,
            // 上传到腾讯云的进度信息
            onProgress: (progressData) => {
              // progressData.percent 进度是0 -1 我们需要0-100 所以*100
              this.percent = parseFloat(progressData.percent * 100);
              // 把进度条显示
              this.showPercent = false;
            },
          },
          // 成功失败的回调 里面用到了this 所以这里需要用箭头函数
          (err, data) => {
            // console.log(err || data);
            // 判断是不是成功 只有成功才对fileList重新赋值
            if (!err && data.statusCode === 200) {
              // 将成功的地址赋值给原来的url属性
              this.fileList = this.fileList.map((item) => {
                // 如果fileList里的uid 等于检查完的图片uid 则进行赋值 否则不做处理
                if (item.uid === this.currentFileUid) {
                  // upload 为true 表示这张图片已经上传完毕
                  return { url: "https://" + data.Location, upload: true };
                }
                return item;
              });
            }
            // 上传等一秒再关闭进度条 用户体验好
            setTimeout(() => {
              // 把进度条数据重置
              this.percent = 0;
              // 把基进度条关闭 把上传显示
              this.showPercent = true;
            }, 1000);
          }
        );
      }
    },
  },
  computed: {
    // 判断是不是只上传了一张图片
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
};
</script>
<style>
/* 有一张图片时 把上传图片隐藏 */
.disabled .el-upload--picture-card {
  display: none;
}
</style>
