# Gui Refresh LWC
This little LWC does one simple thing. It refreshes an objects data without a hard refresh, or a required click of a button, when it receives an event.

The context which I created this under was simple - I had a @future method that performs a callout, then updates data, but sometimes takes too long to see when the 'before' trigger event completed and did its refresh.

The logic that runs when the callback is received from the callout updates the data, but also puts an item on the platform event queue. That event is then received by the component, verified that its the same ID as the object the component is sitting on, and then executes the refresh data ui api event.