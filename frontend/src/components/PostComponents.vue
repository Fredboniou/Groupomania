<template>
    <div class="seePost">
        <div class="userName">                       
            <img :src="post.userPic" :alt="`${post.prenom} ${post.nom}`" id="profilePic" v-if="post.userPic != null" :aria-label="`photo de profil de ${post.prenom} ${post.nom}`">
            <div class="replaceAvatar" v-else><span class="initials">{{ replaceAvatar(post.prenom, post.nom) }}</span></div>
            <router-link :to="`/profile/${post.userId}`" id="userName" :aria-label="`Visitez le profil de ${post.prenom} ${post.nom}`"><h4>{{ post.prenom }} {{ post.nom }}</h4></router-link>
        </div>
        <div class="postContent">
            <p>{{ post.content }}</p><br>
            <img v-if="post.postPic != null" :src="post.postPic" alt="" id="postPicture">
        </div>
        <div class="dateLikes">
            <div class="postDate">
                <p>posté {{ post.date }}</p>
            </div>
        </div>
        <div class="comments">
            <router-link :to="`/post/${post.id}`" id="comments">Voir/laisser un commentaire</router-link>
        </div>
        <div class="ownerOptions" v-if="userId==post.userId || admin==1">
            <router-link :to="`/modifpost/${post.id}`" v-if="userId==post.userId"><button class="modifDel">Modifier</button></router-link>
            <button class="modifDel" @click="deletePost(post.id)">Supprimer</button>
        </div>
    </div>                
</template>



<script>
export default {
    name: "PostComponents",
}
</script>



<style lang="scss" scoped>

</style>