import { Comment, ThumbUp } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import dayjs from "dayjs";

const Post = ({
  fullName = "",
  createAt,
  content = "",
  image,
  likes = [],
  comments = [],
}) => {
  return (
    <div className="card">
      <div className="mb-3 flex gap-3">
        <Avatar className="!bg-primary-main">
          {fullName?.[0]?.toUpperCase()}
        </Avatar>
        <div>
          <p className="font-bold">{fullName}</p>
          <p className="text-dark-400 text-sm">
            {dayjs(createAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
      </div>
      <p className="mb-1">{content}</p>
      {image && <img src={image} />}

      <div className="my-2 flex justify-between">
        <div className="flex gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>
        <div>
          <p>{comments.length} comments</p>
        </div>
      </div>
      <div className="border-dark-300 flex border-b border-t py-1 text-sm">
        <Button size="small" className="flex-1 !text-dark-100">
          <ThumbUp className="mr-1" fontSize="small" /> Like
        </Button>
        <Button size="small" className="flex-1 !text-dark-100">
          <Comment className="mr-1" fontSize="small" /> Comment
        </Button>
      </div>
    </div>
  );
};

export default Post;
