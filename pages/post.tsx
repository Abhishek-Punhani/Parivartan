import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import DotLoaderSpinner from "../components/loaders/dotLoader";
import { useRouter } from "next/router";



const initialState = {
  title: "",
  content: "",
  severity: 50,
  author: "",
  location: "",
  pollutionType: "Air",
  reportError: "",
  customErrorReport: "",
};

export default function Posts() {
  const [post, setPost] = useState(initialState);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/posts/create', post);
      setLoading(false);
      setPost(initialState);
      fetchPosts(); 
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/post/retrieve');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className="relative min-h-screen overflow-hidden flex flex-col items-center bg-gray-100">
        <div className="w-full max-w-6xl p-12 mt-12 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" passHref>
              <div className="w-10 h-10 border border-gray-400 rounded-full grid place-items-center cursor-pointer hover:border-blue-500">
                <BiLeftArrowAlt className="w-6 h-6 text-gray-800 hover:text-blue-500" />
              </div>
            </Link>
            <h1 className="text-4xl font-bold">Create Post</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
              <textarea
                name="content"
                value={post.content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="severity">Severity</label>
              <input
                type="number"
                name="severity"
                value={post.severity}
                onChange={handleChange}
                min={0}
                max={100}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
              <input
                type="text"
                name="author"
                value={post.author}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={post.location}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pollutionType">Pollution Type</label>
              <select
                name="pollutionType"
                value={post.pollutionType}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="Air">Air</option>
                <option value="Water">Water</option>
                <option value="Soil">Soil</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reportError">Report Error</label>
              <select
                name="reportError"
                value={post.reportError}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">None</option>
                <option value="Spam">Spam</option>
                <option value="Inappropriate">Inappropriate</option>
                <option value="Wrong Category">Wrong Category</option>
                <option value="False Information">False Information</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {post.reportError === "Other" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customErrorReport">Custom Error Report</label>
                <input
                  type="text"
                  name="customErrorReport"
                  value={post.customErrorReport}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-4">Posts</h2>
            {posts.length === 0 ? (
              <p>No posts available.</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
                  <p className="text-gray-600">Severity: {post.severity}</p>
                  <p className="text-gray-600">Location: {post.location}</p>
                  <p className="text-gray-600">Pollution Type: {post.pollutionType}</p>
                  <p className="text-gray-600">Author: {post.author}</p>
                  <p className="text-gray-600">Date: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
      <Footer country={{ name: "India" }} />
    </>
  );
}