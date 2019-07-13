// // //scream routes
// // app.get("/screams", getAllScreams);
// // app.get("/scream/:screamId", fbAuth, getScream);
// // app.post("/scream/:screamId", fbAuth, postComment);

// // app.get("/scream/:screamId/like", fbAuth, likeComment);
// // app.get("/scream/:screamId/unlike", fbAuth, unlikeComment);
// // app.post("/scream", fbAuth, postOneScream);
// // app.delete("/scream/:screamId", fbAuth, deleteScream);

// // //user routes
// // app.post("/signup", signup);
// // app.post("/login", login);
// // app.post("/user/image", fbAuth, uploadImage);
// // app.post("/user", fbAuth, addUserDetails);
// // app.get("/user", fbAuth, getAuthenticatedUser);

// const { db } = require("../utils/admin");

// exports.getAllScreams = async (req, res) => {
//   try {
//     const data = await db
//       .collection("screams")
//       .orderBy("createdAt", "desc")
//       .get();
//     if (data) {
//       let screams = [];
//       data.forEach(doc => {
//         screams.push({
//           screamId: doc.id,
//           body: doc.data().body,
//           handle: doc.data().handle,
//           createdAt: doc.data().createdAt,
//           commentCount: doc.data().commentCount,
//           likeCount: doc.data().likeCount,
//           userImg:doc.data().userImg,
//         });
//       });
//       return res.json(screams);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.code });
//   }
// };

// exports.postOneScream = async (req, res) => {
//   const newScream = {
//     body: req.body.body,
//     handle: req.user.handle,
//     createdAt: new Date().toISOString(),
//     totalLikes: 0,
//     totalComments: 0,
//     userImg:req.user.userImg
//   };
//   try {
//     const data = await db.collection("screams").add(newScream);
//     if (data) {
//       res.status(201).json({ created: true, id: data.id });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getScream = async (req, res) => {
//   try {
//     const screamId = req.params.screamId;
//     let screamData = {};
//     const scream = await db
//       .collection("screams")
//       .doc(screamId)
//       .get();
//     if (!scream.exists) {
//       return res.status(404).json({ msg: "Scream not found" });
//     }
//     screamData = scream.data();
//     screamData.id = scream.id;
//     const comments = await db     //to change
//       .collection("comments")
//       .where("screamId","==",req.params.screamId)
//       .orderBy("createdAt", "desc")
//       .get();

//     screamData.comments = [];
//     comments.docs.forEach(doc => {
//       screamData.comments.push(doc.data());
//     });

//     res.json({ screamData });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error });
//   }
// };

// exports.postComment = async (req, res) => {
//   let comment = req.body;
//   if (comment.body === "") {
//     res.status(400).json({ msg: "Comment can't be empty" });
//   }
//   try {
//     const scream = await db     //to change
//       .collection("screams")
//       .doc(req.params.screamId)
//       .get();

//     if (scream.exists) {
//       comment.createdAt = new Date().toISOString();
//       comment.handle = req.user.handle;
//       comment.screamId = req.params.screamId;
//       comment.userImg = req.user.userImg;

//       const response = await db
//         .collection(`comments`).add(comment);
//       scream.ref.update({ totalComments: scream.data().totalComments + 1 });
//       res.json({ msg: `${response.id} created` });
//     } else {
//       res.status(400).json({ msg: "Scream not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: error });
//   }
// };

// exports.likeComment = async (req, res) => {
//   try {
//     const likeRef = db
//       .collection("like")      //to change

//     const screamRef = await db.collection("screams");

//     const scream = await screamRef.doc(req.params.screamId).get();

//     if (scream.exists) {
//       let likes = scream.data().totalLikes + 1;
//       const userLiked = await likeRef
//         .where("handle", "==", req.user.handle).where("screamId","==",req.params.screamId)
//         .limit(1)
//         .get();
//       if (!userLiked.empty) {
//         return res.json({ msg: "User already liked" });
//       }
//       const response = await likeRef.add({
//         handle: req.user.handle,
//         screamId: req.params.screamId
//       });
//       await screamRef.doc(req.params.screamId).update({ totalLikes: likes });
//       // await db
//       //   .collection("userLikes")
//       //   .doc(req.user.handle)
//       //   .collection("likes")
//       //   .add({ screamId: req.params.screamId });
//       return res.json({ msg: response.id, liked: true });
//     } else {
//       return res.status(400).json({ msg: "Scream Not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error });
//   }
// };
// exports.unlikeComment = async (req, res) => {
//   const screamId = req.params.screamId;
//   const handle = req.user.handle;
//   const screamRef = await db
//     .collection("screams")      //to change
//     .doc(screamId)
//     .get();
//   const likeRef = db
//     .collection("likes")

//   const likeDoc = await likeRef
//     .where("handle", "==", handle)
//     .where("screamId", "==", screamId)
//     .limit(1);
//   if (screamRef.exists) {
//     const liked = await likeDoc.get();
//     if (!liked.empty) {
//       await likeRef.doc(liked.docs[0].id).delete();
//       screamRef.ref.update({ totalLikes: screamRef.data().totalLikes - 1 });
//       res.json({ delete: true });
//     } else {
//       return res.json({ msg: "not liked" });
//     }

//     res.json({ msg: "Something went wrogn" });
//   } else {
//     res.status(400).json({ msg: "Scream Not Found" });
//   }
// };

// exports.deleteScream = async (req, res) => {
//   const screamId = req.params.screamId;
//   try {
//     const screamRef = db.collection("screams").doc(screamId);
//     const scream = await screamRef.get();
//     if (!scream.exists) {
//       return res.status(404).json({ error: "Scream not found" });
//     }
//     if (scream.data().handle !== req.user.handle) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }
//     await screamRef.delete();

//     return res.json({ msg: ress.exists });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error });
//   }
// };
