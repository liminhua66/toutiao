module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 跟节点的rem
      rootValue: ({file}) => (/vant/i.test(file)?37.5:75),
      // 哪些属性需要转成rem
      propList: ['*']
    }
  }
}
