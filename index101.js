import express from 'express'; // Server
import bodyParser from 'body-parser'; // Middleware

const app = express();
app.use(bodyParser.json()); // Correctly use bodyParser's json method
app.use(express.urlencoded({ extended: true }));

let posts = [
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content: "455435",
        author: "Alex Thompson",
    },
    {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content: "f54ty54hg456h",
        author: "Mia Williams",
    },
    {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content: "h56hj4568fgu",
        author: "Samuel Green",
    },
    {
        id: 4,
        title: "Sustainable  Lifestyle",
        content: "5y45754745",
        author: "Migs",
    },
];

app.get('/', (req, res) => {
    res.json(posts);
});

// app.post('/signin', (req, res) => {
//     var username = req.body.password123;
//     console.log(username);

//     var password = req.body;
//     res.json({ message: "Added successfully" });
// });

app.post('/share', (req, res) => {
    const { title, content, author } = req.body;

    const newData = {
        id: posts.length + 1, // Correctly increment the ID
        title: title,
        content: content,
        author: author,
    };

    posts.push(newData);
    res.status(200).json({ message: "success" });
});

app.get('/update', (req, res) => {
    res.send("This is update page");
});

app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);

    const post = posts.find((element) => element.id === id); // Compare by element.id

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.patch("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((element) => element.id === id);

    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.author);

    const updatedPost = {
        id: post.id,
        title: req.body.title || post.title,
        content: req.body.content || post.content,
        author: req.body.author || post.author,
    };

    const index = posts.findIndex((element) => element.id === id);
    posts[index] = updatedPost;


    res.json(updatedPost);
});


app.listen(3000, () => {
    console.log("Running on port 3000");
    console.log("Server is running on http://localhost:3000");
});
