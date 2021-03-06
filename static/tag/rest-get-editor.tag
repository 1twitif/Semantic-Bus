<rest-get-editor>
  <div>description du web service à intéroger</div>
  <label>url</label>
  <input type="text" ref="urlInput" onChange={changeUrl} value={data.specificData? data.specificData.url : ""} ></input>
   <label>content-type</label>
  <input type="text"  ref="contentTypeInput"  onChange={changeContentType} value={data.specificData? data.specificData.contentType : "test"}></input>

  <script>
     this.updateData = function(dataToUpdate) {
          this.data = dataToUpdate
          this.update();
      }.bind(this);

    changeUrl(e){
        console.log(e)
        if(this.data != null && this.data.specificData != null ){
          this.data.specificData.url = e.currentTarget.value;
          console.log("if", this.data.specificData.url)
        }else{
          this.data = {}
           this.data.specificData = {}
           this.data.specificData.url = e.currentTarget.value;
           console.log("else", this.data.specificData.url)
        }
        this.update();  
    }
    changeContentType(e){
      console.log(e)
      if(this.data != null && this.data.specificData != null ){
        this.data.specificData.contentType = e.currentTarget.value;
        console.log("if", this.data.specificData.contentType)
      }
      this.update();  
  }
    this.on('mount', function () {

      RiotControl.on('item_current_changed', this.updateData);

      
      }.bind(this));
    this.on('unmount', function () {
      RiotControl.off('item_current_changed', this.updateData);
    });
  </script>
</rest-get-editor>
