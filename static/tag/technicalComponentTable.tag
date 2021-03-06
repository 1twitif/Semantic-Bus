<technical-component-table class="containerV">
  <div class="commandBar containerH">
    <div>add Component</div>
    <div class="containerH commandGroup">
      <!--<div onclick={cancelClick} class="commandButton">
        cancel
      </div>-->
      <div id="addComponent" if={actionReady} onclick={addComponent} class="commandButton notSynchronized">
        add
      </div>
    </div>
  </div>
    <zenTable style="flex:1" ref="technicalComponentTable" disallowcommand={true} disallownavigation={true}>
      <yield to="header">
        <div>type</div>
        <div>description</div>
      </yield>
      <yield to="row">
        <div style="width:30%">{type}</div>
        <div style="width:70%">{description}</div>
      </yield>
    </zenTable>

 <script>

    this.actionReady=false;
    addComponent(e) {
      //this.tags.zentable.data.forEach(record=>{
      //  if(record.selected){
      RiotControl.trigger('workspace_current_add_components',sift({selected:{$eq:true}},this.tags.zentable.data));

      //RiotControl.trigger('back');
        //  }
      //});
    }

    refreshTechnicalComponents(data){
      console.log('technicalCompoents | this.refs |',this.refs);
      this.tags.zentable.data=data;
    }

    this.updateData=function(dataToUpdate){
      this.tags.zentable.data=dataToUpdate;
    }.bind(this);


    this.on('mount', function () {

     this.tags.zentable.on('rowSelect',function(){
        console.log('ROWSELECTD');
        this.actionReady=true;
        this.update();
     }.bind(this));
     this.tags.zentable.on('addRow',function(){
       //console.log(data);
       RiotControl.trigger('technicalComponent_current_init');
     }.bind(this));

     this.tags.zentable.on('delRow',function(data){
       //console.log(data);
       RiotControl.trigger('technicalComponent_delete',data);

     }.bind(this));
     this.tags.zentable.on('cancel',function(data){
       //console.log(data);
       RiotControl.trigger('workspace_current_add_component_cancel');

     }.bind(this));
     RiotControl.on('technicalComponent_collection_changed',this.updateData);

     RiotControl.trigger('technicalComponent_collection_load');

   });

   this.on('unmount', function () {
     RiotControl.off('technicalComponent_collection_changed',this.updateData);
   });
  </script>
  <style>
  .notSynchronized {
    background-color: orange !important;
    color: white;
  }
  </style>
</technical-component-table>
