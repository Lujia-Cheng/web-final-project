Music Library API Documentation
===============================
``` YAM38```
## Overview
This Music Library API interacts with a collection of songs and artists. You can create, read, update, and delete song and artist data. The API uses RESTful principles and responds with JSON data.

## Endpoints
### List All

- GET /all
  - Description: Retrieves a combined list of all songs and artists.
  - Response: JSON object containing both songs and artists.
  - Response Code: 200 OK
  - Example Request: GET https://yam38-assignment3-part-b.glitch.me/all
  - Example Response:
    ```json
    {
      "songs": {
        "Song Title 1": {
          "title": "Song Title 1",
          "artist": "Artist Name 1",
          "genre": "Genre 1",
          "year": 2020
        },
        "Song Title 2": {
          "title": "Song Title 2",
          "artist": "Artist Name 2",
          "genre": "Genre 2",
          "year": 2019
        },
        ...
      },
      "artists": {
        "Artist Name 1": {
          "name": "Artist Name 1",
          "genre": "Genre 1",
          "debutYear": 2015
        },
        "Artist Name 2": {
          "name": "Artist Name 2",
          "genre": "Genre 2",
          "debutYear": 2016
        },
        ...
      }
    }
    ```
### Songs
- ```GET``` /songs
  - Description: Retrieves a list of all songs.
  - Response: JSON array of songs.
  - Response Code: 200 OK
  - Example Request: ```GET```  https://yam38-assignment3-part-b.glitch.me/songs
  - Example Response:
  ```json
[
    {
        "_id": "6564fb7d1e870cc0eec614b4",
        "title": "New Song2",
        "artist": "New Artist2",
        "genre": "New Genre2",
        "year": 2021,
        "__v": 0
    },
    {
        "_id": "6564fb8a1e870cc0eec614b6",
        "title": "New Song4",
        "artist": "New Artist2",
        "genre": "New Genre2",
        "year": 2021,
        "__v": 0
    },
    {
        "_id": "6564fb901e870cc0eec614b8",
        "title": "New Song6",
        "artist": "New Artist2",
        "genre": "New Genre2",
        "year": 2021,
        "__v": 0
    }
]
  ```
- ```GET``` /songs/:id
  - Description: Retrieves a song by title.
  - Response: JSON of the song.
  - Response Code: 200 OK
  - Example Request: ```GET```  https://yam38-assignment3-part-b.glitch.me/songs/New%20Song2
  - Example Response:
  ```json
    {
      "_id": "6564fb7d1e870cc0eec614b4",
      "title": "New Song2",
      "artist": "New Artist2",
      "genre": "New Genre2",
      "year": 2021,
      "__v": 0
    }
  ```
- ```POST``` /songs
  - Description: Adds a new song to the collection.
  - Payload: JSON object containing song details.
  - Response: Confirmation message and details of the added song.
  - Response Code: 201 Created
  - Example Request: ```POST```  https://yam38-assignment3-part-b.glitch.me/songs/Song%20Title%201
```json
{
  "title": "New Song",
  "artist": "New Artist",
  "genre": "New Genre",
  "year": 2021
}
```
Example Response:
```json
{
    "message": "Song added successfully",
    "song": {
        "title": "New Song6",
        "artist": "New Artist2",
        "genre": "New Genre2",
        "year": 2021,
        "_id": "6564fb901e870cc0eec614b8",
        "__v": 0
    }
}
```
- ```PUT``` /songs/:title
  - Description: Updates an existing song.
  - Parameters: title - The title of the song to update.
  - Payload: JSON object containing updated song details.
  - Response: Confirmation message and details of the updated song.
  - Response Code: 200 OK
  - Example Request: ```PUT```  https://yam38-assignment3-part-b.glitch.me/songs/New Song2
```json
{
  "title": "New Song2",
  "artist": "New Artist2 updated",
  "genre": "Updated2 Genre",
  "year": 2022
}
```
Example Response:
```json
{
    "message": "Song updated successfully",
    "song": {
        "_id": "6564fb7d1e870cc0eec614b4",
        "title": "New Song2",
        "artist": "New Artist2 updated",
        "genre": "Updated2 Genre",
        "year": 2022,
        "__v": 0
    }
}
```
- ```DELETE``` /songs/:title
  - Description: Deletes a specific song.
  - Parameters: title - The title of the song to delete.
  - Response: Confirmation message.
  - Response Code: 200 OK
  - Example Request: ```DELETE```  https://yam38-assignment3-part-b.glitch.me/songs/New%20Song2
  - Example Response:
```json
{
  "message": "Song deleted successfully"
}
```

### Artists
- ```GET``` /artists
  - Description: Retrieves a list of all artists.
  - Response: JSON array of artists.
  - Response Code: 200 OK
  - Example Request: ```GET```  https://yam38-assignment3-part-b.glitch.me/artists
  - Example Response:
```json
[
    {
        "_id": "6564fd151e870cc0eec614c1",
        "name": "New Artist1",
        "genre": "New Genre1",
        "debutYear": 2023,
        "__v": 0
    },
    {
        "_id": "6564fd1a1e870cc0eec614c3",
        "name": "New Artist2",
        "genre": "New Genre1",
        "debutYear": 2023,
        "__v": 0
    },
    {
        "_id": "6564fd201e870cc0eec614c5",
        "name": "New Artist3",
        "genre": "New Genre1",
        "debutYear": 2023,
        "__v": 0
    },
    {
        "_id": "6564fd251e870cc0eec614c7",
        "name": "New Artist4",
        "genre": "New Genre2",
        "debutYear": 2023,
        "__v": 0
    },
    {
        "_id": "6564fd281e870cc0eec614c9",
        "name": "New Artist5",
        "genre": "New Genre2",
        "debutYear": 2023,
        "__v": 0
    },
    {
        "_id": "6564fd2b1e870cc0eec614cb",
        "name": "New Artist6",
        "genre": "New Genre2",
        "debutYear": 2023,
        "__v": 0
    }
]
```
- ```GET``` /artists/:id
  - Description: Retrieves a artist by id.
  - Response: JSON of the artist.
  - Response Code: 200 OK
  - Example Request: ```GET```  https://yam38-assignment-3-part-a.glitch.me/artists/Artist%20Name%201
  - Example Response:
```json
  {
    "name": "Artist Name 1",
    "genre": "Genre 1",
    "debutYear": 2015
  }
```

- ```GET``` /artists/:name/songs
  - Description: Retrieves a list of songs by a specific artist.
  - Parameters: `name` - The name of the artist.
  - Response: JSON array of songs by the specified artist.
  - Response Code: 200 OK
  - Example Request: ```GET``` https://yam38-assignment3-part-b.glitch.me/artists/New Artist2/songs
  - Example Response:
    ```json
    [
      {
          "_id": "6564fb8a1e870cc0eec614b6",
          "title": "New Song4",
          "artist": "New Artist2",
          "genre": "New Genre2",
          "year": 2021,
          "__v": 0
      },
      {
          "_id": "6564fb901e870cc0eec614b8",
          "title": "New Song6",
          "artist": "New Artist2",
          "genre": "New Genre2",
          "year": 2021,
          "__v": 0
      }
    ]
    ```
  - If no songs are found for the artist, a 404 response is returned with the message "No songs found for this artist."

- ```POST``` /artists
  - Description: Adds a new artist to the collection.
  - Payload: JSON object containing artist details.
  - Response: Confirmation message and details of the added artist.
  - Response Code: 201 Created
  - Example Request: ```POST```  https://yam38-assignment-3-part-a.glitch.me/artists
```json
{
  "name": "New Artist",
  "genre": "New Genre",
  "debutYear": 2023
}
```
Example Response:
```json
{
  "message": "Artist added successfully",
  "artist": {
    "name": "New Artist",
    "genre": "New Genre",
    "debutYear": 2023
  }
}
```
- ```PUT``` /artists/:name
  - Description: Updates an existing artist.
  - Parameters: name - The name of the artist to update.
  - Payload: JSON object containing updated artist details.
  - Response: Confirmation message and details of the updated artist.
  - Response Code: 200 OK
  - Example Request: ```PUT```  https://yam38-assignment-3-part-a.glitch.me/artists/Artist%20Name%201
```json
{
  "name": "Updated Artist Name",
  "genre": "Updated Genre",
  "debutYear": 2024
}
```
Example Response:
```json
{
  "message": "Artist updated successfully",
  "artist": {
    "name": "Updated Artist Name",
    "genre": "Updated Genre",
    "debutYear": 2024
  }
}
```
- ```DELETE``` /artists/:name
  - Description: Deletes a specific artist.
  - Parameters: name - The name of the artist to delete.
  - Response: Confirmation message.
  - Response Code: 200 OK
  - Example Request: ```DELETE```  https://yam38-assignment-3-part-a.glitch.me/artists/New%20Artist
  - Example Response:
```json
{
  "message": "Artist deleted successfully"
}
```
### Error Handling
- 404 Not Found
  - Description: Returned when a requested resource (song or artist) is not found.
  - Response: Error message.
  - Response Code: 404 Not Found
  - Example Response:
```json
{
  "message": "Resource not found"
}
```