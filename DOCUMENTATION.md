# Lambda Notes

## Introduction

A note manager for my backend project week in Lambda School.

## Author

[Luis Alvarez](http://commithub.com)

## Acknowledgements

* [Julian Kohlman](https://github.com/juliankohlman) - PM
* Diandra Ryan-Mas - Instructor

## Side note

Examples will be shown using the promise base HTTP client [axios](https://github.com/axios/axios)

### GET https://lambda-notes-luis-alvarez.herokuapp.com/note/get/all

> This request get's all the notes from the database.

```
import axios from 'axios';

axios
      .get('https://lambda-notes-luis-alvarez.herokuapp.com/note/get/all')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
});
```

#### Example Output

```
[
    {
        "id":1,
        "title":"FlatBush Zombies",
        "description":"I love their rap",
        "created_at":"2019-02-19T03:41:54.613Z"
    },
    {
        "id":2,
        "title":"Build a house",
        "description":"You play minecraft idk",
        "created_at":"2019-02-19T03:41:54.613Z"
    },
    {
        "id":3,
        "title":"I'm Billy",
        "description":"Hyuck Billy is my name",
        "created_at":"2019-02-19T03:41:54.613Z"
    }
]
```


### POST https://lambda-notes-luis-alvarez.herokuapp.com/note/create

> A route that adds a note to the database and returns metadata about how it was added

```
import axios from 'axios';

 axios
      .post('https://lambda-notes-luis-alvarez.herokuapp.com/note/create', note)
        .then(res => {
          console.log(res.data);
        })
        .catch(() => console.log('Error: Note wasn\'t added'));
```

#### Example Output

```
{
    "command": "INSERT",
    "rowCount": 1,
    "oid": 0,
    "rows": [],
    "fields": [],
    "_parsers": [],
    "RowCtor": null,
    "rowAsArray": false
}
```

#### Error Codes

* 401 message: 'The note is missing data

### PUT https://lambda-notes-luis-alvarez.herokuapp.com/note/edit/:id

> A request that modifies an existing note and returns a list of all the notes in the database

```
import axios from 'axios';

 axios
      .put(`https://lambda-notes-luis-alvarez.herokuapp.com/note/edit/1`, note)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
});
```

#### Example Output

```

[
    {
        "id": 1,
        "title": "FlatBush Zombies",
        "description": "I love their rap",
        "created_at": "2019-02-19T03:41:54.613Z"
    },
    {
        "id": 3,
        "title": "I'm Billy",
        "description": "Hyuck Billy is my name",
        "created_at": "2019-02-19T03:41:54.613Z"
    },
    {
        "id": 4,
        "title": "test1",
        "description": "test",
        "created_at": "2019-02-20T01:54:28.700Z"
    },
    {
        "id": 6,
        "title": "test2",
        "description": "test2",
        "created_at": "2019-02-20T03:25:24.350Z"
    },
    {
        "id": 5,
        "title": "test3",
        "description": "test2",
        "created_at": "2019-02-20T01:58:12.421Z"
    }
]
```

#### Error Codes

* 401 message: 'The note is missing data

### Delete https://lambda-notes-luis-alvarez.herokuapp.com/note/delete/:id

> A route that deletes a note and returns the number of notes deleted

```
import axios from 'axios';

axios
      .delete(`https://lambda-notes-luis-alvarez.herokuapp.com/note/delete/1`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log('Error: Note wasn\'t deleted');
});
```

#### Example Output

```
1
```

#### Error Codes

* 401 message: 'You need a valid id for the note you want to delete