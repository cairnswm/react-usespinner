# useSpinner

Wraps action calls that can be grouped together to display a spinner while 1 or more is active. By default an action will be marked as complete after 10 seconds. 

Any item that may require an indication of processing may be considered an action. For example a fetch call, or a long running process.

Typically before a fetch is started, an action would be started for the fetch. Once the fetch rresolves or is in error then the action can be ended

```javascript
start("slowapi") // start action
console.log("Starting slowapi action")
fetch("https://flash-the-slow-api.herokuapp.com/delay/3000")
.then(res => res.text())
.then(data => console.log(data))
.finally(() => {
    console.log("Ending slowapi action")
    end("slowapi") // finally end action
})
```

## Usage

```javascript
import useSpinner from './hooks/usespinner';

const { start, end, clear, busy, SpinnerContainer } = useSpinner();

// To start a new action
start("10 Second timer")

// To end an existing action
end("10 Second timer")

// clear all actions
clear();

// Check if any actions currently running
if (busy()) {
    console.log("There are actions running")
}

// Display a spinner (if any actions are running) 
<SpinnerContainer>
    LOADING
</SpinnerContainer>
```

## Configuration

A global timeout can be configured, by default this is 10 seconds

```javascript
// to set a global delay of 1 second
const { start, end, clear, SpinnerContainer } = useSpinner({ delay: 1000 });
```

Each action can also be configurred with a configurable timeout
```javascript
// To start a new action that may take up to 60 seconds
start("10 Second timer", { delay: 60000 })
```

The action will be kept active based on (in order), action delay, global delay, 10 seconds

## ending actions

calling the end action method will immediatly close all actions with the given name, irrespective to when they were started, if mutiple actions with the same name are to be started each must be uniquely identified by name

```javascript
start("genericname", { delay: 10000})
start("genericname", { delay: 20000})
start("genericname", { delay: 30000})

end("genericname"); // will mark all three actions as complete as they have the same name
```

## Custom fetch

useSpinner also exports it's own fetch method. This method is compatible with a normal browser fetch but creates a unique action id that is tracked by the useSpinner actions