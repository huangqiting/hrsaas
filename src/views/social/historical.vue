<template>
  <div class="historicalArcBox">
    <div class="historicalArcTop">
      <div class="title">
        <span>全公司</span>
        <div class="yearChange">
          <el-date-picker
            v-model="yearVal"
            value-format="yyyy"
            type="year"
            size="mini"
            width="130px"
            placeholder="选择年"
            @change="changeYear"
          />
        </div>
      </div>
    </div>
    <div v-loading="loading" class="historicalTable">
      <div v-for="( itemes, index) in tableData" :key="index" class="itemes">
        <div class="itemTopLab" :class="{act: itemes.act}">
          <div class="lab" @click="openTable(itemes,index)"> > </div>
          <div>
            <p class="title">{{ itemes.month }}社保报表 <span>{{ itemes.creationTime }}</span></p>
            <p class="labTit" @click="openTable(itemes,index)">社保报表</p>
          </div>
          <div>
            <p class="itemTit"><span>企业缴纳</span></p>
            <p class="itemNum">{{ itemes.enterprisePayment }}</p>
          </div>
          <div>
            <p class="itemTit"><span>个人缴纳</span></p>
            <p class="itemNum">{{ itemes.personalPayment }}</p>
          </div>
          <div>
            <p class="itemTit"><span>合计</span></p>
            <p class="itemNum">{{ itemes.total }}</p>
          </div>
        </div>
        <div v-show="itemes.act" class="itemDropDown">
          <div class="topLab">
            <div><span style="background-color:#cfeffe;" />已离职</div>
            <div><span style="background-color:#a8f8bb;" />再入职</div>
            <div><span style="background-color:#fedbd7;" />公司合计</div>
            <div><span style="background-color:#ffe8c9;" />一级部门</div>
            <div><span style="background-color:#fdfcd5;" />二级部门</div>
            <div class="rightLabBox">
              <a href="/"><i class="el-icon-search" /></a>
              <a href="/"><div>导出</div></a>
            </div>
          </div>
          <el-table
            id="item"
            :data="itemes.contentData"
            height="300"
            border
            style="width: 100%;text-align: center"
          >
            <el-table-column type="index" label="序号" center width="50" />
            <el-table-column prop="username" label="姓名" width="150px" />
            <el-table-column prop="timeOfEntry" :formatter="transformDateFormat" label="入职时间" width="150px" />
            <el-table-column prop="mobile" label="手机号" width="150px" />
            <el-table-column prop="idNumber" label="身份证号码" width="150px" />
            <el-table-column prop="theHighestDegreeOfEducation" label="学历" width="150px" />
            <el-table-column prop="bankCardNumber" label="开户行" width="150px" />
            <el-table-column prop="firstLevelDepartment" label="一级部门" width="150px" />
            <el-table-column prop="twoLevelDepartment" label="二级部门" width="150px" />
            <el-table-column prop="workingCity" label="工作城市" width="150px" />
            <el-table-column prop="socialSecurityComputerNumber" label="社保电脑号" width="150px" />
            <el-table-column prop="providentFundAccount" label="公积金账号" width="150px" />
            <el-table-column prop="leaveDate" label="离职时间" width="150px" />
            <el-table-column prop="householdRegistrationType" label="户籍类型" width="150px" />
            <el-table-column prop="participatingInTheCity" label="参保城市" width="150px" />
            <el-table-column prop="socialSecurityMonth" label="社保月份" width="150px" />
            <el-table-column prop="socialSecurityBase" label="社保基数" width="150px" />
            <el-table-column prop="socialSecurity" label="社保合计" width="150px" />
            <el-table-column prop="socialSecurityEnterprise" label="社保企业" width="150px" />
            <el-table-column prop="socialSecurityIndividual" label="社保个人" width="150px" />
            <el-table-column prop="providentFundCity" label="公积金城市" width="150px" />
            <el-table-column prop="providentFundMonth" label="公积金月份" width="150px" />
            <el-table-column prop="providentFundBase" label="公积金基数" width="150px" />
            <el-table-column prop="accumulationFundEnterpriseBase" label="公积金企业基数" width="150px" />
            <el-table-column
              prop="proportionOfProvidentFundEnterprises"
              label="公积金企业比例"
              width="150px"
            />
            <el-table-column prop="individualBaseOfProvidentFund" label="公积金个人基数" width="150px" />
            <el-table-column prop="personalRatioOfProvidentFund" label="公积金个人比例" width="150px" />
            <el-table-column prop="totalProvidentFund" label="公积金合计" width="150px" />
            <el-table-column prop="providentFundEnterprises" label="公积金企业" width="150px" />
            <el-table-column prop="providentFundIndividual" label="公积金个人" width="150px" />
            <el-table-column prop="pensionEnterpriseBase" label="养老企业基数" width="150px" />
            <el-table-column prop="proportionOfPensionEnterprises" label="养老企业比例" width="150px" />
            <el-table-column prop="pensionEnterprise" label="养老企业" width="150px" />
            <el-table-column prop="personalPensionBase" label="养老个人基数" width="150px" />
            <el-table-column prop="personalPensionRatio" label="养老个人比例" width="150px" />
            <el-table-column prop="oldAgeIndividual" label="养老个人" width="150px" />
            <el-table-column prop="unemploymentEnterpriseBase" label="失业企业基数" width="150px" />
            <el-table-column prop="proportionOfUnemployedEnterprises" label="失业企业比例" width="150px" />
            <el-table-column prop="unemployedEnterprise" label="失业企业" width="150px" />
            <el-table-column prop="theNumberOfUnemployedIndividuals" label="失业个人基数" width="150px" />
            <el-table-column prop="percentageOfUnemployedIndividuals" label="失业个人比例" width="150px" />
            <el-table-column prop="unemployedIndividual" label="失业个人" width="150px" />
            <el-table-column prop="medicalEnterpriseBase" label="医疗企业基数" width="150px" />
            <el-table-column prop="proportionOfMedicalEnterprises" label="医疗企业比例" width="150px" />
            <el-table-column prop="medicalEnterprise" label="医疗企业" width="150px" />
            <el-table-column prop="medicalPersonalBase" label="医疗个人基数" width="150px" />
            <el-table-column prop="medicalPersonalRatio" label="医疗个人比例" width="150px" />
            <el-table-column prop="medicalIndividual" label="医疗个人" width="150px" />
            <el-table-column prop="baseOfIndustrialInjuryEnterprises" label="工伤企业基数" width="150px" />
            <el-table-column
              prop="proportionOfIndustrialInjuryEnterprises"
              label="工伤企业比例"
              width="150px"
            />
            <el-table-column prop="industrialInjuryEnterprise" label="工伤企业" width="150px" />
            <el-table-column prop="fertilityEnterpriseBase" label="生育企业基数" width="150px" />
            <el-table-column prop="proportionOfFertilityEnterprises" label="生育企业比例" width="150px" />
            <el-table-column prop="childbearingEnterprise" label="生育企业" width="150px" />
            <el-table-column prop="baseOfSeriousIllness" label="大病企业基数" width="150px" />
            <el-table-column
              prop="proportionOfSeriouslyIllEnterprises"
              label="大病企业比例"
              width="150px"
            />
            <el-table-column prop="bigDiseaseEnterprise" label="大病企业" width="150px" />
            <el-table-column prop="personalBaseOfSeriousIllness" label="大病个人基数" width="150px" />
            <el-table-column prop="personalProportionOfSeriousIllness" label="大病个人比例" width="150px" />
            <el-table-column prop="aPersonOfGreatDisease" label="大病个人" width="150px" />
            <el-table-column prop="providentFundNotes" label="公积金备注" width="150px" />
            <el-table-column prop="socialSecurityNotes" label="社保备注" width="150px" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArchivingList, getArchivingCont } from '@/api/social'
export default {
  name: 'HistoricalArchiving',
  data() {
    return {
      loading: false,
      num: 0,
      yearVal: '2020',
      tableData: []
    }
  },
  mounted() {
    this.getArchivingList()
  },
  methods: {
    async getArchivingList() {
      this.loading = true
      this.tableData = await getArchivingList({ year: this.yearVal })
      this.loading = false
    },
    async  openTable(obj, index) {
      if (!obj.act) {
        const data = await getArchivingCont({ month: obj.yearsMonth, year: this.yearVal, opType: 2 })
        this.$set(this.tableData[index], 'contentData', data)
        this.loading = false
        this.$set(this.tableData[index], 'act', true)
      } else {
        this.$set(this.tableData[index], 'act', false)
      }
    },

    changeYear() {
      this.getArchivingList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import './../../styles/variables.scss';

.historicalArcBox{
  padding: 20px;
  .historicalArcTop{
    position:relative;
    background: #fff;
    padding:10px 15px 0 15px;
    .title{
      color:$blue;
      line-height: 40px;
      border-bottom: solid 2px $blue;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      padding: 0 25px;
      .yearChange{
        position: absolute;
        top:5px;
        right: 10px;
      }
    }
  }
  .historicalTable{
    background: #fff;
    .itemes{
      .itemTopLab{
        border-top:solid 1px #f0f0f0;
        border-bottom: solid 3px #ccc;
        padding: 15px;
        div{
          display: inline-block;
          padding:0 50px;
          border-right: solid 1px #ccc;
        }
        div:last-child, div:first-child{
          border: none;
        }
        .lab{
          position: relative;
          top:-15px;
          padding-right: 0;
          padding-left: 15px;
        }
        .labTit{
          cursor:pointer;
        }
        .title{
          font-size: 16px;
          margin: 10px 0;
          span{
            position: relative;
            bottom:-2px;
            font-size: 13px;
            color:#999;
            margin-left: 5px;
          }
        }
        .itemTit{
          color:#999;
          margin: 8px 0;
          font-size: 13px;
        }
        .itemNum{
          font-size: 20px;
          margin: 0;
        }
      }
      .itemDropDown{
        background: #fff;
        .topLab{
          position: relative;
          padding: 15px;
          div{
            display: inline-block;
            margin: 0 10px;
            span{
              display: inline-block;
              position: relative;
              top:2px;
              margin-right: 5px;
              width: 15px;
              height: 15px;
              // background:$cl-1;
            }
          }
          .rightLabBox{
            position: absolute;
            right: -10px;
            top:10px;
            div{
              border:solid 1px $green;
              color:$green;
              border-radius:3px;
              padding: 4px 10px;
              font-size: 14px;
            }
          }
        }
      }
      .act{
        border-bottom:solid 3px $panGreen;
        .lab{
          color:$panGreen;
        }
        .labTit{
          color:$panGreen;
        }
      }
    }
    .itemes:hover{
      background: #fafbff;
    }
    .itemes .lab:hover{
      cursor:pointer;
    }
  }
}
</style>
