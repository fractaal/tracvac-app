## TracVac Plugin Specification (WIP)
### Server Modules
- UserRegistrationFields
	- Concerns when the user first registers onto TracVac. Any data supplied to the UserRegistrationFields module shows up on the Registration form in the TracVac app. 
	- This module also exposes an endpoint to to be consumed by the TracVac app, so that the app can then show the extra registration fields that may be required.

A more technical specification is as follows:
```
UserRegistrationFields {
	
	addRegistrationField(Section []) => void
	getRegistrationFields() => Section []
		
}

GET /registrationFields => Section []
```

- UserDataFields
	- Concerns the database model of the User. The registration form that the user fills up does _not_ have a one-to-one relationship with the data stored in the database. Any data supplied to the UserDataFields module will show up on the Administrator Interface. 
	- This module exposes an endpoint to be consumed by the Administrator Interface.

⚠ It should be noted that the UserRegistrationFields and UserDataFields modules do _not_ create the necessary fields in the database. This needs to be handled manually by the plugin by interfacing with the `knex` instance (the database query builder TracVac uses) exposed to the plugin.

### Graphical User Interface
TracVac allows plugins to expose Vue (UI) components that are designed for either the client app or the administrator interface. Communication between the Vue components (front-end of the plugin) and the main plugin code (back-end) can be achieved by the plugin exposing its own endpoints, and then letting the front-end components consume those endpoints. 
⚠ Note: These plugin components have to be compiled in advance (precompiled) as they are imported at runtime, and Webpack, the module bundler this project uses, will not be aware of the existence of plugins until then. This means that they must be compiled on their own, in advance using `vue build --target lib`.