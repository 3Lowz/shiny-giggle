# shiny-giggle

Exercise built from `npx create-react-app --template=typescript`

## Run-up

In the project directory, you can run:

 1. `npm i` || `npm install`
 2. `npm start`
 3. Open your browser @ [http://localhost:3000](http://localhost:3000)

## Technical choices

### Scaffolding
```bash
├── App.tsx
├── components
│   └── components.tsx
├── context
│   └── context.ts
├── react-app-env.d.ts
├── services
│   └── service.ts
└── App.css
```
> Context has been used as work-around for state management

### Architecture

 - For the user interaction I've used a widely used approach encapsulating smaller elements into a larger feature element. The **Fetch Data** button has been kept separated due to the missing of a state handler and to avoid the (sometimes) hard debugging of callbacks as props.
 - The `Weather.service.ts` is the responsable for fetching & transforming the data in a _DDD_ pattern
 - I've been kept a separate `Weather.d.ts` intended as a global `index.d.ts` for modularity interoperability while, insteadm leaving the _props_ definition (as a type) inside the component file for responsability concerns and component "as it is" re-usability.

### Notes:

 - `Weather.list.tsx` is just a list of the fetched data and is commented in the code
 - `Wheater.service.ts` contains a reference to a bug that could be workarounded with better typization, that I didn't due to hurry on being late