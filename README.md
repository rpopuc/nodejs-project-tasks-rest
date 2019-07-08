# REST with Nodejs and Express

A simple REST application with Nodejs and Express.

Install with:
```
yarn
```

Run with:

```
yarn run dev
```

## API endpoints

`POST`: `/projects`

Create a project:
```
curl --request POST \
  --url http://localhost:3000/projects \
  --header 'content-type: application/json' \
  --data '{
	"id": "1",
	"title": "First Project"
}'
```

---

`PUT`: `/projects/:id`

Update a project
```
curl --request PUT \
  --url http://localhost:3000/projects/1 \
  --header 'content-type: application/json' \
  --data '{
	"title": "An example Project"
}'
```

---

`POST`: `/projects/:id/tasks`

Create a task
```
curl --request POST \
  --url http://localhost:3000/projects/1/tasks \
  --header 'content-type: application/json' \
  --data '{
	"title": "First Task"
}'
```

---

`GET`: `/projects`

List projects
```
curl --request GET \
  --url http://localhost:3000/projects
```

---

`DELETE`: `/projects/:id`

Delete a project
```
curl --request DELETE \
  --url http://localhost:3000/projects/1
```
