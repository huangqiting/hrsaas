
import Layout from '@/layout'

const attendRouter = {
  path: '/attendances',
  component: Layout,
  name: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      name: 'attendances',
      meta: {
        title: '考勤',
        icon: 'excel' }
    },
    {
      path: 'archiving',
      component: () => import('@/views/attendances/historical'),
      name: 'archiving',
      hidden: true,
      meta: {
        title: '归档'
      }
    },
    {
      path: 'report/:month',
      component: () => import('@/views/attendances/report'),
      name: 'reports',
      hidden: true,
      meta: {
        title: '报表'
      }
    }
  ]
}
export default attendRouter
