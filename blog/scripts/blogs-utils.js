const blogElement = document.getElementById("blog-container");
let blogsRawData = [];
let loadingTimeout = {};
let limit = 5
function createBlogHTML(blogs) {
  const blogContentElement = blogs
    .map(function (blog, i) {
      if (i < limit) {
        return `<div class="flex flex-col md:flex-row gap-6 w-full">
    <img
      src="${blog.imageUrl}"
      alt="feature image 1"
      class="w-full md:w-auto"
    />
    <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
      <h3 class="text-2xl font-semibold">
        ${blog.title}
      </h3>
      <p class="text-xl font-light">
        ${blog.description}
      </p>
      <p>At ${blog.publishedDate}</p>
      <a href="${blog.url}" class="text-wd-brand">Read more</a>
    </div>
    </div>`;
      }
    })
    .join("");

  blogElement.innerHTML = blogContentElement;
}

function readMore() {
limit+= 5 
createBlogHTML(blogsRawData)
}

function searchBlogs(element) {
  console.log(loadingTimeout);
  clearTimeout(loadingTimeout);
  blogElement.innerHTML = "Loading...";

  const searchTime = () => {
    const filteredBlogs = blogsRawData.filter(function (blog) {
      return (
        blog.title.includes(element.value) ||
        blog.description.includes(element.value)
      );
    });
    createBlogHTML(filteredBlogs);
  };

  loadingTimeout = setTimeout(searchTime, 2000);
}

function sortBlogs(element) {
  console.log(loadingTimeout);
  clearTimeout(loadingTimeout);
  blogElement.innerHTML = "Loading...";
  loadingTimeout = setTimeout(() => {
    const sortedBlogs = blogsRawData.sort(function (a, b) {
      if (element.value === "desc") {
        return new Date(b.publishedDate) - new Date(a.publishedDate);
      } else {
        return new Date(a.publishedDate) - new Date(b.publishedDate);
      }
    });
    createBlogHTML(sortedBlogs);
  }, 2000);
}

async function main() {
  const response = await axios.get("/scripts/blogs.json");
  blogsRawData = response.data;
  createBlogHTML(blogsRawData);
}

main();
