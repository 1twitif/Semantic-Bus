module.exports = {
  type: 'Join By Field',
  description: 'completer un flux par un second en se basant sur un champ du 1er et un identifiant du 2nd',
  editor: 'join-by-field-editor',
  graphIcon:'joinByField.png',
  sift: require('sift'),

  getPrimaryFlow: function(data, flowData) {
    console.log(data,flowData.map(f=>f.componentId));
    console.log(data.specificData.primaryComponentId);
    var primaryFlow = this.sift({
      componentId: data.specificData.primaryComponentId
    }, flowData)[0];
    console.log("---------PRIMARY FLOW--------", primaryFlow)
    return primaryFlow;
  },
  pull: function(data, flowData) {
    console.log('Join by Field');
    //console.log('Join by Field | pull : ', data, ' | ', flowData);
    return new Promise((resolve, reject) => {
      var secondaryFlowData = this.sift({
        componentId: data.specificData.secondaryComponentId
      }, flowData)[0].data;
      var primaryFlowData = this.sift({
        componentId: data.specificData.primaryComponentId
      }, flowData)[0].data;

      console.log('joinByField | primaryFlowData :', primaryFlowData);
      console.log('joinByField | secondaryFlowData :',secondaryFlowData);
      //console.log(primaryFlowData.componentId);
      //console.log(secondaryFlowData);
      //console.log(this.sift({ agregName: 'Max - ORSET'}, secondaryFlowData));


      var resultData = primaryFlowData.map(function(primaryRecord) {
        //console.log(primaryRecord);
        //console.log(data.specificData.primaryFlowFKId);
        let filter = {};
        filter[data.specificData.secondaryFlowId] = primaryRecord[data.specificData.primaryFlowFKId];
        //console.log(filter);
        primaryRecord[data.specificData.primaryFlowFKName] = this.sift(filter, secondaryFlowData)[0];
        return primaryRecord;
      }.bind(this));
      //console.log(resultData);


      resolve({
        data: resultData
      });
    })
  }
}
