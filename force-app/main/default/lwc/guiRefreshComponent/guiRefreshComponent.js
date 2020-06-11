import { LightningElement, api, track } from "lwc";
import { subscribe, onError } from "lightning/empApi";

export default class GuiRefreshEvent extends LightningElement {
  @api recordId;
  @track channelName = "/event/Refresh_Page__e";
  @track isSubscribeDisabled = false;
  @track isUnsubscribeDisabled = !this.isSubscribeDisabled;

  subscription = {};

  handleChannelName(event) {
    this.channelName = event.target.value;
  }

  connectedCallback() {
    var currentId = this.recordId;
    const messageCallback = function (response) {
      console.log("New message received");
      // refreshes the data on the page
      if (currentId == response.data.payload.Id__c) {
        // this can be a security issue - use sparingly
        eval("$A.get('e.force:refreshView').fire();");
      }
    };

    subscribe(this.channelName, -1, messageCallback).then((response) => {
      console.log(
        "Successfully subscribed to : ",
        JSON.stringify(response.channel)
      );
    });
  }

  registerErrorListener() {
    onError((error) => {
      console.log("Received error from server: ", JSON.stringify(error));
    });
  }
}
