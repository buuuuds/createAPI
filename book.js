import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

let books = [
    { bookid: 1, title: "The Rise of Decentralized Finance", author: "Alex Thompson", publisher: "Rudy" },
    { bookid: 2, title: "The Impact of Artificial Intelligence on Modern Businesses", author: "Mia Williams", publisher: "Reyniel" },
    { bookid: 3, title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle", author: "Samuel Green", publisher: "Boyet" },
    { bookid: 4, title: "Sustainable Lifestyle", author: "Migs", publisher: "Gelo" },
];

// Implement login....................
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        res.json({ message: "Login success" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Add a new book......................
app.post("/books", (req, res) => {
    const { title, author, publisher } = req.body;
    if (!title || !author || !publisher) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const bookid = books.length > 0 ? Math.max(...books.map(b => b.bookid)) + 1 : 1;
    const book = { bookid, title, author, publisher };
    books.push(book);
    res.status(201).json(book);
});

// Retrieve all books..................
app.get("/books", (req, res) => {
    res.json(books);
});

// Get details of a specific book..............
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.bookid === Number(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

app.patch("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = books.find(b => b.bookid === bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Extract form-urlencoded data from req.body
    const { title, author, publisher } = req.body;

    // Check if at least one field is being updated
    if (!title && !author && !publisher) {
        return res.status(400).json({ message: "At least one field must be updated" });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (publisher) book.publisher = publisher;

    res.json({ message: "Book updated successfully", book });
});



// Delete a certain book
app.delete("/books/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.bookid === Number(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
