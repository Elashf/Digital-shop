"use client";

import React, { FormEvent, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

type CommentType = {
  _id: string;
  body: string;
  score: number;
  productID: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
  };
};

type Props = {
  productID: string;
  comments: CommentType[];
};

function Comments({ productID, comments }: Props) {
  const [score, setScore] = useState(5);
  const [body, setBody] = useState("");

  const sendComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        score,
        productID,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("کامنت ثبت شد");
      setBody("");
      setScore(5);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* نمایش نظرات */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">نظرات کاربران</h2>

        {comments.length === 0 ? (
          <div className="rounded-lg border p-5 text-center text-gray-500">
            هنوز نظری برای این محصول ثبت نشده است.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="mb-4 rounded-xl border p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{comment.user.name}</h3>

                <div className="flex items-center gap-1 text-yellow-500">
                  <span>{comment.score}</span>
                  <FaStar />
                </div>
              </div>

              <p className="mt-4 leading-8">{comment.body}</p>
            </div>
          ))
        )}
      </div>

      {/* فرم ثبت نظر */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">ثبت نظر</h2>

        <div className="my-5 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setScore(star)}
              className={`cursor-pointer text-2xl ${
                star <= score ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <form onSubmit={sendComment} className="space-y-4">
          <textarea
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-green-700 px-8 py-3 text-white transition hover:bg-green-800"
          >
            ثبت نظر
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comments;