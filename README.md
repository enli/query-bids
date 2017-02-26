#query-bids (practice assignment)

##How to run:

Open up src/index.html in browser and refer on-screen mini walk-through or:

Generate dummy bids:
```
var bids = new BidsGenerator().generate(); // generate() also accepts a number
```

Instantiate BidsQuery:
```
var q = new BidsQuery(bids);
```

Query bids:
```
q.getBidsByLastUpdated(5); //get latest 5 bids by updated date
```
OR
```
q.getBidsByLastExecuted(5); //get latest 5 bids by executed date
```

**Bonus:**

getBidsByLastUpdated and getBidsByLastExecuted methods of BidsQuery accept filter name as second
parameter.
```
q.getBidsByLastUpdated(5, 'foo'); // filter foo tag
```

##Assumptions:

1. Firing Ajax requests is not required and is out of the scope.
   The solution directly works with bids array.
2. The problem statement mentions JavaScript solution and
   UI isn't mentioned so I have created minimal UI to drive the JavaScript code.
3. Bids need to be sorted based on recent dates i.e. select latest n bids.
4. Relatively newer browser is used for testing, such as IE9 and onwards.


##Areas for improvements

1. As this assignment is for UI developer, build a complete working UI implementation
   to accept bids, process bids and display on the screen.
2. Sorting function used in BidsQuery is not guaranteed to be stable sort in all browsers.
   Implement custom sorting function e.g. merge sort.

