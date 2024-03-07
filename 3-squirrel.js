class MaxPriorityQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue(elemento, prioridad) {
      const item = { elemento, prioridad };
      let agregado = false;
      for (let i = 0; i < this.items.length; i++) {
        if (item.prioridad > this.items[i].prioridad) {
          this.items.splice(i, 0, item);
          agregado = true;
          break;
        }
      }
      if (!agregado) {
        this.items.push(item);
      }
    }
  
    dequeue() {
      return this.items.shift();
    }

    print() {
        console.log(this.items);
      }
}

function computeCorrelation(TP, TN, FP, FN) {
    let numerator = TP * TN - FP * FN;
    let denominator = Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN))!==0?Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN)):1;
    return numerator / denominator;
}

async function squirrel() {

    let data = await fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json').then(response => response.json());
    let uniqueEvents = new Set();
    let eventsInfo = {};
    for (let entry of data) {
        for (let event of entry.events) {
            uniqueEvents.add(event);
            eventsInfo[event] = { TP: 0, TN: 0, FP: 0, FN: 0 };
        }
    }

    for (let uniqueEvent of uniqueEvents) {
        for (let entry of data) {
            let hasEvent = entry.events.includes(uniqueEvent);
            let isSquirrel = entry.squirrel;
            if (hasEvent && isSquirrel) {
                eventsInfo[uniqueEvent].TP++;
            } else if (hasEvent && !isSquirrel) {
                eventsInfo[uniqueEvent].FP++;
            } else if (!hasEvent && isSquirrel) {
                eventsInfo[uniqueEvent].FN++;
            } else if (!hasEvent && !isSquirrel) {
                eventsInfo[uniqueEvent].TN++;
            }
        }
    }

    let maxPriorityQueue = new MaxPriorityQueue();
    for (let event in eventsInfo) {
        let { TP, TN, FP, FN } = eventsInfo[event];
        let correlation = computeCorrelation(TP, TN, FP, FN);
        maxPriorityQueue.enqueue(event, correlation);
    }

    console.log("Below are the events and their correlation in descending order:");
    maxPriorityQueue.print();

}


squirrel();