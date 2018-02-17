import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import BarChartPage from '@/pages/BarChartPage';
import LineChartPage from '@/pages/LineChartPage';
import PieChartPage from '@/pages/PieChartPage';
import RadarChartPage from '@/pages/RadarChartPage';
import PolarChartPage from '@/pages/PolarChartPage';
import BubbleChartPage from '@/pages/BubbleChartPage';
import DoughnutChartPage from '@/pages/DoughnutChartPage';
import ScatterChartPage from '@/pages/ScatterChartPage';
import MixedChartPage from '@/pages/MixedChartPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/barchart',
      name: 'BarChartPage',
      component: BarChartPage
    },
    {
      path: '/linechart',
      name: 'LineChartPage',
      component: LineChartPage
    },
    {
      path: '/piechart',
      name: 'PieChartPage',
      component: PieChartPage
    },
    {
      path: '/radarchart',
      name: 'RadarChartPage',
      component: RadarChartPage
    },
    {
      path: '/polarchart',
      name: 'PolarChartPage',
      component: PolarChartPage
    },
    {
      path: '/bubblechart',
      name: 'BubbleChartPage',
      component: BubbleChartPage
    },
    {
      path: '/doughnutchart',
      name: 'DoughnutChartPage',
      component: DoughnutChartPage
    },
    {
      path: '/scatterchart',
      name: 'ScatterChartPage',
      component: ScatterChartPage
    },
    {
      path: '/mixedchart',
      name: 'MixedChartPage',
      component: MixedChartPage
    }
  ]
});
