```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Write note and click Save
    Browser->>Server: POST /new_note_spa (note content as JSON)
    Server-->>Browser: 201 Created (success response)
    Browser-->>User: Update UI with new note (no page reload)
