const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};


function timeAgo(timestamp){
  const past=new Date(timestamp);
  const now=new Date;

  const diff=now-past;
  const diffMin=Math.floor(diff/1000/60);
  const diffHr=Math.floor(diffMin/60);
  const diffDy=Math.floor(diffHr/24);
  if(diffMin<60){  
     return `${diffMin}m ago`;
  }else if(diffHr<24){ 
    return `${diffHr}h ago`;
  }else{
     return `${diffDy}d ago`;
  }
}

function viewCount(numberW){
  if(numberW>=1000){
    return Math.floor(numberW/1000)+"k";
  }else{
    return numberW;
  }
}

function forumCategory(idC){
  if(idC in allCategories){
    return `<a class="category ${allCategories[idC].className}" href="${forumCategoryUrl}${allCategories[idC].className}/${idC}">${allCategories[idC].category}</a>`;
  }else{
    return `<a class="category general" href="${forumCategoryUrl}general/${idC}">General</a>`;
  }
}

function avatars(posters,users){
  const imgs= posters.map((poster)=>{
     const match= users.find((user)=>user.id===poster.user_id)
     const size=match.avatar_template.replace("{size}","30");
     const src=size.startsWith("/")?avatarUrl+size:size;
     return `<img alt="${match.name}" src="${src}">`;
  });
  return imgs.join("");
}

function showLatestPosts(post){
  const {users,topic_list}=post;
  const{topics}=topic_list;

   const p= topics.map((topic)=>{
    return `<tr>
    <td>
    <a class="post-title" href="${forumTopicUrl}${topic.slug}/${topic.id}">${topic.title}</a>
    ${forumCategory(topic.category_id)}
    </td>
    <td>
    <div class="avatar-container">${avatars(topic.posters,users)}</div>
    </td>
    <td>
    ${topic.posts_count-1}
    </td>
    <td>
    ${viewCount(topic.views)}
    </td>
    <td>
    ${timeAgo(topic.bumped_at)}
    </td>
    </tr>`
   })

   document.querySelector("#posts-container").innerHTML= p.join("");
}

const fetchData=async()=>{
  try{
    const res=await fetch(forumLatest);
    const pasar=await res.json()
    showLatestPosts(pasar);
  }catch(err){
  console.log("error"+err);
  }
}

fetchData();
