Music Library API Documentation
===============================
## Overview
This Music Library API interacts with a collection of songs and artists. You can create, read, update, and delete song and artist data. The API uses RESTful principles and responds with JSON data.

## Endpoints
### Songs
- GET /songs
  - Description: Retrieves a list of all songs.
  - Response: JSON array of songs.
  - Response Code: 200 OK
  - Example Request: GET  https://yam38-assignment-3-part-a.glitch.me/songs
  - Example Response:
  ```json
  [
    {
      "title": "Song Title 1",
      "artist": "Artist Name 1",
      "genre": "Genre 1",
      "year": 2020
    },
    ...
  ]
  ```
- GET /songs/:id
  - Description: Retrieves a song by title.
  - Response: JSON of the song.
  - Response Code: 200 OK
  - Example Request: GET  https://yam38-assignment-3-part-a.glitch.me/songs/Song%20Title%201
  - Example Response:
  ```json
    {
      "title": "Song Title 1",
      "artist": "Artist Name 1",
      "genre": "Genre 1",
      "year": 2020
    }
  ```
- POST /songs
  - Description: Adds a new song to the collection.
  - Payload: JSON object containing song details.
  - Response: Confirmation message and details of the added song.
  - Response Code: 201 Created
  - Example Request: POST  https://yam38-assignment-3-part-a.glitch.me/songs
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
    "title": "New Song",
    "artist": "New Artist",
    "genre": "New Genre",
    "year": 2021
  }
}
```
- PUT /songs/:title
  - Description: Updates an existing song.
  - Parameters: title - The title of the song to update.
  - Payload: JSON object containing updated song details.
  - Response: Confirmation message and details of the updated song.
  - Response Code: 200 OK
  - Example Request: PUT  https://yam38-assignment-3-part-a.glitch.me/songs/Song%20Title%201
```json
{
  "title": "Updated Song Title",
  "artist": "Updated Artist",
  "genre": "Updated Genre",
  "year": 2022
}
```
Example Response:
```json
{
  "message": "Song updated successfully",
  "song": {
    "title": "Updated Song Title",
    "artist": "Updated Artist",
    "genre": "Updated Genre",
    "year": 2022
  }
}
```
- DELETE /songs/:title
  - Description: Deletes a specific song.
  - Parameters: title - The title of the song to delete.
  - Response: Confirmation message.
  - Response Code: 200 OK
  - Example Request: DELETE  https://yam38-assignment-3-part-a.glitch.me/songs/Song Title
  - Example Response:
```json
{
  "message": "Song deleted successfully"
}
```

### Artists
- GET /artists
  - Description: Retrieves a list of all artists.
  - Response: JSON array of artists.
  - Response Code: 200 OK
  - Example Request: GET  https://yam38-assignment-3-part-a.glitch.me/artists
  - Example Response:
```json
[
  {
    "name": "Artist Name 1",
    "genre": "Genre 1",
    "debutYear": 2015
  },
  ...
]
```
- GET /artists/:id
  - Description: Retrieves a artist by id.
  - Response: JSON of the artist.
  - Response Code: 200 OK
  - Example Request: GET  https://yam38-assignment-3-part-a.glitch.me/artists/Artist%20Name%201
  - Example Response:
```json
  {
    "name": "Artist Name 1",
    "genre": "Genre 1",
    "debutYear": 2015
  }
```
- POST /artists
  - Description: Adds a new artist to the collection.
  - Payload: JSON object containing artist details.
  - Response: Confirmation message and details of the added artist.
  - Response Code: 201 Created
  - Example Request: POST  https://yam38-assignment-3-part-a.glitch.me/artists
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
- PUT /artists/:name
  - Description: Updates an existing artist.
  - Parameters: name - The name of the artist to update.
  - Payload: JSON object containing updated artist details.
  - Response: Confirmation message and details of the updated artist.
  - Response Code: 200 OK
  - Example Request: PUT  https://yam38-assignment-3-part-a.glitch.me/artists/Old Artist Name
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
- DELETE /artists/:name
  - Description: Deletes a specific artist.
  - Parameters: name - The name of the artist to delete.
  - Response: Confirmation message.
  - Response Code: 200 OK
  - Example Request: DELETE  https://yam38-assignment-3-part-a.glitch.me/artists/Artist Name
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