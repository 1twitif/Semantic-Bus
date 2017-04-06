<rest-api-get-editor>
  <div>description de l'api</div>
  <label>url</label>
  <input type="text" name="urlInput" value={data.specificData.url}></input>
  <label>content-type</label>
  <input type="text" name="contentTypeInput" value={data.specificData.contentType}></input>
  <script>

    this.innerData={};
    this.test=function(){
      consol.log('test');
    }

    Object.defineProperty(this, 'data', {
       set: function (data) {
         this.innerData=data;
         this.update();
       }.bind(this),
       get: function () {
        return this.innerData;
      },
      configurable: true
    });
    this.on('mount', function () {
      this.urlInput.addEventListener('change',function(e){
        this.innerData.specificData.url=e.currentTarget.value;
      }.bind(this));

      this.contentTypeInput.addEventListener('change',function(e){
        this.innerData.specificData.contentType=e.currentTarget.value;
      }.bind(this));

      RiotControl.on('item_current_changed',function(data){
        this.innerData=data;

        this.update();
      }.bind(this));
    });

  </script>
</rest-api-get-editor>