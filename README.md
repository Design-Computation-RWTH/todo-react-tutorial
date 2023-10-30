# Preface
In order to follow this tutorial, please first complete the main Branch!

# Introduction
In the last part of the tutorial, we learned how to create a React Application using pure React and HTML. In this part, we will install and use a third-party component library that helps us quickly create nicely-looking applications that often come with advanced functionalities that would take us several hours to create. For this tutorial, we will use https://mantine.dev/, but there are numerous alternatives out there on the web, and you can use whatever fits you best! If you are looking for other libraries, keep in mind that is best to select one which is well-maintained and documented! A good rule of thumb is, to take a look at the GitHub repository and see how many stars the repository has (it will give you a hint of how many users a repository has) and when the last update was (if the last update is older then six month, chances are good that the project is not maintained anymore!).

# Step 1: Install the library 
- The first step is to install the Mantine modules in our project. If the project is still running in the terminal, click on it and use ```ctrl+c``` to terminate the application.
- When adding new modules to a project, we can use ```npm install module_name``` for it
- Next install the modules ```@mantine/hooks```, and ```@mantine/core```
```console
npm install @mantine/core @mantine/hooks
```
- And install PostCSS and postcss-preset-mantine
```console
npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars
```
- Add at the root of your project a files called ```postcss.config.js``` with following code:
```javascript
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```
- Add an Icons Package like tabler icons:
```console
npm install "@tabler/icons-react"
```
- Finally, start up the application again.
```console
npm start
```

# Step 2: Setup Mantine
- Many modules need a Provider in the application that is responsible for communicating necessary information between the components of the library (e.g. for switching between dark and light modes)
- Therefore, we must navigate to ```index.tsx``` and add the provider and the Mantine themes.
```typescript
// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Import provider and createTheme
import { MantineProvider, createTheme } from "@mantine/core";
// Import Mantine Themes
import "@mantine/core/styles.css";

const theme = createTheme({});
const root = ReactDOM.createRoot(
document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<MantineProvider theme={theme}>
			<App />
		</MantineProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```
# Step 3: Replace Inputs, Selects and Buttons with Mantine Components
- When we go to, e.g. https://mantine.dev/core/button, we can see how a button in Mantine is created and what props it needs. Moreover, we see some example codes for adding additional colours, sizes, etc., to the button.
- First, import the components on top of ```App.tsx```
```typescript
// App.tsx
import React from "react";
import { Task } from "./types";
import { TaskComponent } from "./task-component";
// Mantine Imports
import { Button, TextInput, NativeSelect } from "@mantine/core";
```
- We can replace the ```<input.../>```, ```<select...></select>``` and ```<button...></button>```with the Mantine Inputs, NativeSelect and Buttons since they mainly share the same props.
- We shall do the same in the ```task-component.tsx```

# Step 4: Use the Mantine Text Component
- We can wrap our Texts in ```<Text>``` components to have more control over our texts. Where applicable, we can also choose to use the ```<Title>```

# Step 5: Go wild
- We can implement many changes and features using Libraries such as Mantine. Go ahead and test out what you can achieve while playing around. An example is provided here in the repository.
![](images/Pasted%20image%2020231030172317.png)
# Explanation
In this Branch, we added additional components and cleaned them up. We replaced most of the native React components with Mantine Components. The newly created components are now found under ```src/components```. We also replaced the old "Adding Tasks" logic with a little Button that opens a Modal (a window inside our window) where we can now enter the details. We no longer have to select a status because the status is defined depending on which column we used to create the new task.

![](images/Pasted%20image%2020231030172717.png)

