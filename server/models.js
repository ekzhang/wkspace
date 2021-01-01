import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    id: String,
    problem: {
      title: String,
      timeLimit: String,
      memoryLimit: String,
      input: String,
      output: String,
      statement: {
        text: [String],
        inputSpec: [String],
        outputSpec: [String],
        sampleTests: [
          {
            input: String,
            output: String,
          },
        ],
        notes: [String],
      },
      link: String,
      submitLink: String,
    },
    solution: {
      language: Number,
      code: String,
    },
  },
  {
    timestamps: true,
  }
);

const shareSchema = new mongoose.Schema(
  {
    id: String,
    solution: {
      language: Number,
      code: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Workspace = mongoose.model('Workspace', workspaceSchema);
export const Share = mongoose.model('Share', shareSchema);
