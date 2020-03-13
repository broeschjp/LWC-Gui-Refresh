({
    onInit : function(component, event, helper) {
        const empApi = component.find('empApi');
        const channel = component.get('v.channel');
        const replayId = -1;

        empApi.subscribe(channel, replayId, $A.getCallback(eventReceived => {
            console.log("New message received");
            // refreshes the data on the page
            if (component.get('v.recordId') == eventReceived.data.payload.Id__c) {    
                $A.get('e.force:refreshView').fire();
            }
        }))
        .then(subscription => {
            console.log('Subscribed to channel ', subscription.channel);
            component.set('v.subscription', subscription);
        });
    }
})
