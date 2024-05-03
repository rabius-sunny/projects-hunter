# Project Hunter

## Welcome to Project Hunter created with Nextjs 14 & Ant Design.

## Run Locally

Clone the project

```bash
git clone https://github.com/rabius-sunny/projects-hunter.git
```

Go to the project directory

```bash
cd projects-hunter
```

Prepare packages and build

```bash
npm i && npm run build
```

Start the production server

```bash
npm start
```

Now you can view the project on your local machine at [http://localhost:3000](http://localhost:3000).

##### You can also see the project live at [projects-hunter.vercel.app](https://projects-hunter.vercel.app/)

## Architecture

- Initially a login page will ask for credentials to enter the app. Demo credentials are suggested inside the input field as **placeholder**.

<img src='https://raw.githubusercontent.com/rabius-sunny/projects-hunter/main/assets/images/login.png' />

- After a successful login, all projects come to the view. Here, projects can be briefly read, edited and removed. _Note: These projects are initially coming from fakedata by `react-query` and the zustand store immediately get filled for further operations._

<img src='https://raw.githubusercontent.com/rabius-sunny/projects-hunter/main/assets/images/projects.png' />

- Details of a project can be checked by hitting the _Eye_ button.

<img src='https://raw.githubusercontent.com/rabius-sunny/projects-hunter/main/assets/images/projectdetails.png' />

Here, new members and tasks can be added to the specific project. Details of a task can be checked by hitting the _Eye_ button from a specific task.

<img src='https://raw.githubusercontent.com/rabius-sunny/projects-hunter/main/assets/images/taskdetails.png' />

Or tasks can be reviewed and managed by kanban by going to **View all** from the tasks list
<img src='https://raw.githubusercontent.com/rabius-sunny/projects-hunter/main/assets/images/kanban.png' />
