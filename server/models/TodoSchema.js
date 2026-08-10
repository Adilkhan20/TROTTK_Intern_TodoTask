const { default: mongoose } = require("mongoose");

const TodoListSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDatabase",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  status: {
    type: String,
    enum: ["pending", "block", "Inprogress", "Done"],
  },
});

const Todo = mongoose.model("Todo", TodoListSchema);

module.exports = Todo;
