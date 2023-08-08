import React, {useState} from "react";

let nextId = 0;

export const PostForm = ({connected}) => {
    const [post, setPost] = useState("");
    const [postList, setPostList] = useState([]);
    
    const submitPost = () => {
        setPostList( 
            [ ...postList,
                { 
                    id: nextId++, 
                    text: post, 
                    date: new Date().toDateString(),
                }
            ]
        );
    }

    return (
        <>
            { connected ? (
                <>
                    <div className="form w-1/3 bg-white p-4 mx-auto">
                        <form>
                            <label className="block">
                                <textarea 
                                    type="text" 
                                    placeholder="What's on your mind?"
                                    value={post || ""}
                                    onChange={(event) => {
                                        setPost(event.target.value);
                                    }}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                ">
                                </textarea>
                            </label>
                            <div className="text-right">
                                <input 
                                    className="btn-create bg-violet-600 hover:bg-violet-800 mt-4 px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-full shadow-sm hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                                    onClick={() => submitPost()}
                                    value="Post"
                                    type="button"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="container w-full md:w-1/3 mt-4">
                        { postList.length ? (
                            postList.toReversed().map((item, id) => {
                                return (
                                    <div className="w-full my-2 mb-3" key={id}>
                                        <div className="bg-white w-full p-5 rounded-md">
                                            <p className="mb-1">{item.text}</p>
                                            <p className="text-slate-400 italic text-sm">{item.date}</p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="w-full my-2 mb-3">
                                <div className="bg-white w-full p-5 rounded-md">
                                    <p className="text-slate-400 italic">This is where your post will appear.</p>
                                </div>
                            </div>
                            
                        )}
                    </div>
                </>
            ) : (
                <div className="container w-full md:w-1/3 mt-4">
                    <div className="w-full my-2">
                        <div className="bg-white w-full p-5">
                            <p>Connect to your wallet to create your first post.</p>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}
