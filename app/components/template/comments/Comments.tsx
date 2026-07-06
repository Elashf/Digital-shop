"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";


type CommentType={
  body:string,
  score:number,
  productID: string
}

type Props = {
  productID: string;
  comments:CommentType | null

}


function Comments({productID ,comments}:Props) {
  const [score, setScore] = useState(5);

  const [body, setBody] = useState("");

  const sendComment = async(e:any)=>{
    e.preventDefault()
    const res = await fetch("/api/comments",{
        method:"POST" , 
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ body , score , productID})
    })
    if(res.ok){
        toast.success("کامنت ثبت شد")
        setBody("");
  setScore(5);
    }else {
  const data = await res.json();
  toast.error(data.message);
}
  }
  return (
    <>
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">نظرات کاربران</h2>
           {comments && comments.map((comment)=>(
              <div key={comment._id} className="border rounded-xl p-4 mb-4">
           
            <div className="flex justify-between">

              <h3 className="font-bold">{comment.user.name} </h3>

              <span className="text-yellow-500">{comment.score} <span className="text-yellow-500 text-xl">
              ★
            </span></span>
            </div>
 <p className="mt-4 leading-8">{comment.body}</p>
          </div>
            ))}
          
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">ثبت نظر</h2>
           <div className="flex my-5">
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
          <form
          onSubmit={sendComment}
          className="space-y-4">
            

           
            <textarea
             value={body}
            onChange={(e)=> setBody(e.target.value)}
              rows={5}
              placeholder="نظر خود را بنویسید..."
              className="w-full border rounded-lg p-3"
            />

            <button
            type="submit"
            className="cursor-pointer bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg">
              ثبت نظر
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Comments;
