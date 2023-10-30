In this tutorial, we will learn the Basics of React and Typescript to create a little ToDo Application. The final result will look like this:
![](images/Pasted%20image%2020231030144528.png)

# Prerequisites
Make sure that you have NodeJS and Visual Studio Code (or any other IDE) installed on your machine, and add NodeJS to the PATH variable of your device (if not done so by the installation process).

# Step 1: Create Application
- Create a react app called "todo-tutorial".
```console
npx create-react-app todo-tutorial --template typescript
```
- Navigate to the newly created directory.
```console
cd todo-tutorial
```

# Step 2: Start up the Application 
- Start up the application by writing ```npm start``` into the terminal and pressing enter. If you don't see any terminal, go to the upper Ribbon and go to Terminal->New Terminal.
- The Application will now run on ```http://localhost:3000```. Usually, your browser is automatically opening the page. If not, just write the URL into your browser.
- If you have another application running on Port 3000, it may happen that React automatically chooses the next free port (3001, 3002...).
- You should now see the sample react page:
![](images/Pasted%20image%2020231030104244.png)
![[Pasted image 20231030104244.png]]
# Step 3: Investigating the Structure
- Create-React-App adds a folder called "src" (source) where all the code for the application is located.
- ```index.tsx``` contains the basic setup and is responsible for creating our react application. It has ```App.tsx``` as a child component, which is rendering our current site.
- ```App.tsx``` is a simple react component which returns a simple website.

# Step 4: Hello World
- Now we edit the preview page by adding our own text.
- In ```App.tsx```, we delete the current content a render a simple "Hello World" text:
```typescript
import React from "react";

function App() {
	return <div>Hello World</div>;
}
export default App;
```
- See how the website is now without styling.
![](images/Pasted%20image%2020231030105249.png)
# Step 5: Simple HTML
- Let us create a very simple page with a header and three columns for the different ToDo States (Open, in Progress, Done).
- We use Flex Box to create the layout (Link).
- We can provide CSS styling by using the ```style``` prop in the components.
- There are different options to provide styling to react components:
- By directly writing our CSS styling in the prop:
```Typescript
<div	style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        alignContent: "center",
        display: "flex",
}}>...</div>
```
- By creating a style variable:

```Typescript
<div style={appContainer}>...</div>
....
const appContainer: React.CSSProperties = {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    alignContent: "center",
    display: "flex",
}
```
- Or by using a CSS file, as seen in the example Create React App.
- With this technique, we are creating our very simple design:

```Typescript
import React from "react";

function App() {
	return (
	<div style={appContainer}>
		<div
		style={{
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "red",
			alignContent: "center",
			display: "flex",
		}}>					
			My Todo App
		</div>
		<div
		style={{
			flex: 1,
			flexDirection: "row",
			display: "flex",
		}}>		
			<div style={todoColumn}>Open</div>
			<div style={todoColumn}>In Progress</div>
			<div style={todoColumn}>Done</div>
		</div>
	</div>
	);
}

const todoColumn: React.CSSProperties = {
	flex: 1,
	flexDirection: "column",
	backgroundColor: "green",
	padding: 10,
	margin: 10,	
	borderRadius: 10,
	};

const appContainer: React.CSSProperties = {
	flex: 1,
	flexDirection: "column",
	backgroundColor: "yellow",
	height: "100vh",
	width: "100vw",
	display: "flex",
	};
	
export default App;
```
- We used different colours at first to see the effects of Flex Box. We will later replace them with some proper styling. ![](images/Pasted%20image%2020231030111915.png)

# Step 6: Create "Add Title" functionality

##  Step 6.1 Create State
- In this step, we will create a little Text Input where we can enter the title of a task and print it at our console as soon as we click the submit button.
- First, we need to create a new React State.
```Typescript
const [taskTitle, setTaskTitle] = React.useState<string>("");
```
- States are similar to Variables but can be used inside React Components. If we use a simple Variable inside a React Component, the initial variable will be displayed in it, but nothing else will happen as soon as the variable changes.
- If we use states, we can update it by using its "State" mechanism, and the react component will also update to the new state.
- A state is always set up in the same way. On the left side of the variable, we have the get and set values ```[getValue, setValue]```, and on the right side, we define the type of the state ```<type>``` (in our case, a string) and its initial value ```(initialValue)``` (which is an empty string "" in our case).

## Step 6.2 Create Form
- We will not use the "real" form component since we are using the states.
- We add a ```<div>```with the following components:
```typescript
    <div style={{ flexDirection: "row" }}>
        <input
        value={taskTitle}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
            setTaskTitle(event.target.value)
        }
        type="text"
        placeholder="Enter Task Title"
        name="Add Task"
        />
        <button onClick={handleSubmit}>Add Task</button>
    </div>
```

- The Input is a text box where the user can enter text. As its value, we are using our state (which is empty at the beginning), and on changing the input (entering text), the value is updated.
	- Remember that we must state a little function for the "onChange" event. In this, we have a variable called "event", which is of type ```React.ChangeEvent<HTMLInputElement>```, and it sets our ```taskTitle``` with the event's ```target.value```.
- The placeholder is the text that is displayed when the input is empty. It is used to give the user a hint on what to enter.
- Theoretically, we don't need the "value" and "onChange" props since this is already handled internally inside the input component, but to easily access the value outside the input, it is a good idea to combine this with a State.
- The Button has a prop called "onClick", which can have a function as an input that is executed as soon as the button is clicked.
- We create a little function that prints our current value for the task title in the console and cleans the input.
```typescript
function handleSubmit() {
	console.log("Task Title: ", taskTitle);
	setTaskTitle("");
}
```

# Step 7: Adding a Task to our Column
- Let us do a small update to our code to add the current text in our input to the "Open" column in our ToDo App.
- First, we need to create a new State for our tasks.
```Typescript
const [tasks, setTasks] = React.useState<string[]>([])
```
- The brackets ([]) behind the string means that it is not a single variable but a List/Array of strings (we want to have more than one task).
- Next, we need to modify our handleSubmit function slightly by adding our current value to the list of already created tasks:
```typescript
function handleSubmit() {
	console.log("Task Title: ", taskTitle),
	setTasks([...tasks, taskTitle]);
	setTaskTitle("");
}
```
- The ```setTask```function is filled with a spread copy of the current tasks and the new value ```[...tasks, taskTitle]```.
	- ```[tasks, taskTitle]``` would not work because then our State would be filled with a string list, and not single strings!
- Finally, we need to add some code to our render return to display the list of tasks:
```typescript
<div style={taskContainer}>
	<div style={todoColumn}>
		Open
		<div>
			{tasks.map((task, i) => (
				<div key={i}>{task}</div>
			))}
		</div>
	</div>
	<div style={todoColumn}>In Progress</div>
	<div style={todoColumn}>Done</div>
</div>
```
- In React, we can always add a curly Bracket inside the HTML to input Typescript.
	- But it is important that this Typescript snippet returns a renderable value, meaning types like strings, numbers, and React Components!
	- In our case, we iterate through our "task" state with ```tasks.map((task) => ())``` and return for every entry a React Component with the index number of the task in the list (i) as a key (ID) and the value of the task as a string.

# Step 8: Creating a Task Type
- Since our tasks should contain a bit more information than "just" a title, it makes sense to create our own type for this task.
- This way, we can control what each task item in a list should contain.
- We want to have a title, a status, and an optional description for the task.
- At the top of our document (before defining the ```function App() {...}```) we create our new Type:
```typescript
type Task = {
	title: string;
	status: "open" | "in-progress" | "done";
	description?: string;
}
```
- In a type, we always have the name of the value and then define its type. E.g. that our title is a string.
- For the status, we want to have an enumeration, meaning there are only three different values that we can select from. If we enter something else into the status field, if we use it, it will return an error.
- The description is optional for our tasks. Therefore, it contains a "?" at the end of its name.

# Step 9: Enter More Inputs
- Now that we have our Task type, we need additional states and inputs to fill those.
- The states:
```typescript
const [taskTitle, setTaskTitle] = React.useState<string>("");
const [tasks, setTasks] = React.useState<Task[]>([]);
const [taskStatus, setTaskStatus] = React.useState<"open" | "in-progress" | "done">("open");
const [taskDescription, setTaskDescription] = React.useState<string>("");
```
- The submit function:
```typescript
function handleSubmit() {
setTasks([...tasks, { title: taskTitle, status: taskStatus, description: taskDescription }]);
setTaskTitle("");
setTaskDescription("");
setTaskStatus("open");
}
```
- Inside the react component for the inputs.
```typescript
<div style={{ flexDirection: "row" }}>
	<input
	value={taskTitle}
	onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
	setTaskTitle(event.target.value)}
	type="text"
	placeholder="Enter Task Title"
	/>
	<input
	value={taskDescription}
	onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
	setTaskDescription(event.target.value)}
	type="text"
	placeholder="Enter Task Description"
	/>
	<select
	value={taskStatus}
	onChange={(event: React.ChangeEvent<HTMLSelectElement>) => 
	setTaskStatus(
	event.target.value as "open" | "in-progress" | "done"
	)}>	
		<option>open</option>
		<option>in-progress</option>
		<option>done</option>
	</select>
	<button onClick={handleSubmit}>Add Task</button>
</div>
```

- And in our Todo column:
```typescript
<div style={todoColumn}>
	Open
	<div>
		{tasks.map((task, i) => (
			<div key={i}>
			<div>Title: {task.title}</div>
			<div>Description: {task.description}</div>
			<select value={task.status}>
				<option>open</option>
				<option>in-progress</option>
				<option>done</option>
			</select>
			</div>
		))}
	</div>
</div>
```

# Step 10: Splitting up the code
- It is getting a bit crowded inside our code, so it makes sense to split up the code into different components and files.
- First of all, let us create a file where we can define our type since multiple files will need to access this later on.
	- We create a file called ```types.d.ts``` and put the type with a minor addition into it:
```typescript
// types.d.ts 

export type Task = {
	title: string;
	status: "open" | "in-progress" | "done";
	description?: string;
};
```
- "Export" is needed to tell Typescript that we can access the type in other files.
- We then need to import the type into our ```App.tsx``` file:
```typescript
// App.tsx

import React from "react";
import { Task } from "./types";
```

- Next, we create a Component that is rendering a single Task. We call it ```task-component.tsx```.
```typescript
//task-component.tsx

import { Task } from "./types";

type TaskComponentProps = {
task: Task;
index: number;
};

export function TaskComponent(props: TaskComponentProps) {
return (
<div key={props.index}>
	<div>Title: {props.task.title}</div>
	<div>Description: {props.task.description}</div>
	<select value={props.task.status}>
		<option>open</option>
		<option>in-progress</option>
		<option>done</option>
	</select>
</div>
);
}
```
- The component is almost equal to what we put into rendering our tasks in ```App.tsx```.
- The difference is that we created a new Type containing the task information and the task index in the list.
- For the function, we define the input as ```props: TaskComponentProps```this way, we can, later on, extend our Type without needing to change the input of the function because we can always use ```props.something```.
- Our ```App.tsx``` now looks like this:
```typescript
//App.tsx

import React from "react";
import { Task } from "./types";
import { TaskComponent } from "./task-component";

export default function App() {

const [taskTitle, setTaskTitle] = React.useState<string>("");
const [tasks, setTasks] = React.useState<Task[]>([]);
const [taskStatus, setTaskStatus] = React.useState<"open" | "in-progress"
    | "done">("open");
const [taskDescription, setTaskDescription] = React.useState<string>("");

function handleSubmit() {
    setTasks([...tasks, { title: taskTitle, 
        status: taskStatus, description: taskDescription },]);
    setTaskTitle("");
    setTaskDescription("");
    setTaskStatus("open");
}
return (
    <div style={appContainer}>
        <div style={headerContainer}>My Todo App</div>
        <div style={{ flexDirection: "row" }}>
            <input
            value={taskTitle}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                setTaskTitle(event.target.value)
            }
            type="text"
            placeholder="Enter Task Title" />
            <input
            value={taskDescription}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                setTaskDescription(event.target.value)
            }
            type="text"
            placeholder="Enter Task Description"/>
            <select
            value={taskStatus}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setTaskStatus(event.target.value as "open" | "in-progress" |
                "done")
            }>			
                <option>open</option>
                <option>in-progress</option>
                <option>done</option>
            </select>
            <button onClick={handleSubmit}>Add Task</button>
        </div>
        <div style={taskContainer}>
            <div style={todoColumn}>
                Open
                <div>
                    {tasks.map((task, i) => (
                        <TaskComponent task={task} index={i} />
                    ))}
                </div>
            </div>
            <div style={todoColumn}>In Progress</div>
            <div style={todoColumn}>Done</div>
    </div>
    </div>
);
}

const todoColumn: React.CSSProperties = {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 10,
};

const appContainer: React.CSSProperties = {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "yellow",
    height: "100vh",
    width: "100vw",
    display: "flex",
};

const headerContainer: React.CSSProperties = {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    alignContent: "center",
    display: "flex",
};

const taskContainer: React.CSSProperties = {
    flex: 1,
    flexDirection: "row",
    display: "flex",
};
```

# Step 11: Filter Tasks for the columns
- We don't want to display all tasks under "open" but filter them by their status.
- Therefore, we need to adjust our code in ```App.tsx```.
```typescript
// App.tsx 
[...]
 <div style={taskContainer}>
	<div style={todoColumn}>
		Open
		<div>
			{tasks.map((task, i) =>
					// only show open tasks
					task.status === "open" && (
					<TaskComponent task={task} index={i} key={i} />))}
		</div>
</div>
	<div style={todoColumn}>
		In Progress{" "}
		<div>
			{tasks.map((task, i) =>
				// only show in-progress tasks
				task.status === "in-progress" && (
				<TaskComponent task={task} index={i} key={i} />))}
		</div>
	</div>
	<div style={todoColumn}>
		Done
		<div>
			{tasks.map((task, i) =>
				// only show done tasks
				task.status === "done" && (
					<TaskComponent task={task} index={i} key={i} />))}
		</div>
	</div>
</div>
[...]
 ```
 - With this method, the iteration is just returning a component if ```task.status```equals the respective status for the column.
  
![](images/Pasted%20image%2020231030133045.png)
# Step 12: Change the Status of the Task
- Until now, we have not been able to change the status of the task (maybe you noticed the error in the console).
- To do so, we need to make two modifications to our code.
- The first modification is in ```App.tsx```. We must create a ```changeStatus``` function and add it as a prop to the TaskComponents.

```typescript
// App.tsx

export default function App() {
	[...]

    function changeStatus(newStatus: "open" | "in-progress" 
        | "done"), index: number) 
    {
		  const newTasks = [...tasks];
		  newTasks[index].status = newStatus;
		  setTasks(newTasks);
    }
	[...]
	return (
	[...]
	<TaskComponent task={task} index={i} key={i} onChange={changeStatus}/>
	[...]
	)

```

- In ```changeStatus``` we create a copy of newTasks and fill it with ```[...tasks]```. Otherwise, we would directly try to change a value in the Tasks, which is impossible with states since we have to use the setTasks method.
- Remember to change the prop at all three components!
- In the ```TaskComponent```, we need to add the onChange event to the props and define in the component what should happen if we select another value in the select component:

```typescript
// App.tsx
import { Task } from "./types";

type TaskComponentProps = {
task: Task;
index: number;
onChange: (newStatus: "open" | "in-progress" | "done", index: number) => void;
};

export function TaskComponent(props: TaskComponentProps) {
	function handleChangeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
		props.onChange(event.target.value as "open" | "in-progress" | 
            "done", props.index);
	}
	
return (
<div key={props.index}>
	<div>Title: {props.task.title}</div>
	<div>Description: {props.task.description}</div>
	<select value={props.task.status} onChange={handleChangeStatus}>
		<option>open</option>
		<option>in-progress</option>
		<option>done</option>
	</select>
</div>
);
}
```
- We must add an ```onChange``` event to the select input using the ```props.onChange```, and fill it with the task's status and index.

# Step 13: Summary of Tasks

- At the bottom of our page, we want to display the amount of open, in-progress and done tasks.
- Therefore, we first create three new States that contain the count of tasks
```typescript
const [openTaskCount, setOpenTaskCount] = React.useState<number>(0);
const [inProgressTaskCount, setInProgressTaskCount] =React.useState<number>(0);
const [doneTaskCount, setDoneTaskCount] = React.useState<number>(0);
```
- We will use States, too, but in this case, we have to handle the update of these values a bit differently.
- Since this value needs to be calculated as soon as the tasks change, we can use a React function called ```useEffect()```.
	- ```useEffect()``` executes a function as soon as a condition is met.
```typescript
// App.tsx
React.useEffect(() => {
	setOpenTaskCount(tasks.filter((task) => task.status === "open").length);
	setInProgressTaskCount(tasks.filter((task) => task.status === "in-progress").length);
	setDoneTaskCount(tasks.filter((task) => task.status === "done").length);
}, [tasks]);
```
- ```useEffect``` is setup by defining a function ```() => {...}``` and then adding a variable that is watched ```useEffect(function, [condition])```.
- This way, our Effect is only triggered when something changes inside the Tasks, which is done by using the setTasks function.
- In the return of our component, we add the following code:
```typescript
// App.tsx
[...]
 return(
	 [...]
	 <div style={summaryContainer}>
		<div>Tasks open: {openTaskCount} </div>
		<div>Tasks in-progress: {inProgressTaskCount}</div>
		<div>Tasks done: {doneTaskCount}</div>
	</div>
</div>
 )

 const summaryContainer: React.CSSProperties = {
	flexDirection: "column",
	display: "flex",
	margin: 20,
};
```

- The result should look like this:
![](images/Pasted%20image%2020231030140023.png)
# Step 14: Style the application
- Finally, we will style our application so it doesn't look as chaotic.
- You can do so as you please. The final code for our example can be retrieved from this repository.
![](images/Pasted%20image%2020231030144528.png)

# Next Steps:
Next, we want to take a look how we can install and use a component library in React, that is taking care of the styling for our application. Therefore, switch to the Branch "Advanced Styling" and follow the instructions in the README.md file.