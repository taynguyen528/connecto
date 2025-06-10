import { createEntityAdapter } from "@reduxjs/toolkit";
import { rootApi } from "./rootApi";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  },
});

const initialState = postsAdapter.getInitialState();

/*
  Entity adapter giúp chúng ta quản lý dữ liệu trong redux store và nó sẽ giúp chúng ta
  chuẩn hóa dữ liệu theo dạng { id: { ...data } } và nó sẽ giúp chúng ta dễ dàng
  truy xuất dữ liệu hơn. 
  Cung cấp cho chúng ta các methods để dễ dàng cập nhật xóa dữ liệu đã được chuẩn hóa
  phía trên thay bị phải tạo ra các state như post, luôn luôn chỉ có 1 nguồn dữ liệu
  duy nhất hay còn gọi là single source of truth
*/

export const postApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createPost: builder.mutation({
        query: (formData) => {
          return {
            url: "/posts",
            method: "POST",
            body: formData,
          };
        },
        onQueryStarted: async (
          args,
          { dispatch, queryFulfilled, getState },
        ) => {
          console.log({ args });

          const store = getState();
          const tempId = crypto.randomUUID();
          const newPost = {
            _id: tempId,
            likes: [],
            comments: [],
            content: args.get("content"),
            author: {
              notifications: [],
              _id: store.auth.userInfo._id,
              fullName: store.auth.userInfo.fullName,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __v: 0,
          };

          const patchResult = dispatch(
            rootApi.util.updateQueryData("getPosts", "allPosts", (draft) => {
              postsAdapter.addOne(draft, newPost);
            }),
          );

          try {
            const { data } = await queryFulfilled;
            console.log({ data });
            dispatch(
              rootApi.util.updateQueryData("getPosts", "allPosts", (draft) => {
                postsAdapter.removeOne(draft, tempId);
                postsAdapter.addOne(draft, data);
              }),
            );
          } catch (err) {
            console.log({ err });
            patchResult.undo();
          }

          console.log({ newPost });
        },
        // invalidatesTags: ["POSTS"],
      }),
      getPosts: builder.query({
        query: ({ limit, offset } = {}) => {
          return {
            url: "/posts",
            params: { limit, offset },
          };
        },
        transformResponse: (response) => {
          return postsAdapter.upsertMany(initialState, response);
          // console.log({postsAdapter, response})
          // return response;
          // return postsAdapter.upsertMany(initialState, response.posts);
        },
        serializeQueryArgs: () => "allPosts",
        merge: (currentCache, newItems) => {
          // gộp dự liệu mới vào cache hiện tại để đảm bảo dữ liệu sẽ không bị duplicated
          // bởi vì nó đã có 1 hệ thống các ids duy nhất
          // và nó sẽ tự động cập nhật các ids mới vào cache hiện tại
          return postsAdapter.upsertMany(currentCache, newItems);
        },
        providesTags: [{ type: "POSTS" }],
      }),
      likePost: builder.mutation({
        query: (postId) => {
          return {
            url: `/posts/${postId}/like`,
            method: "POST",
          };
        },
        onQueryStarted: async (
          args,
          { dispatch, queryFulfilled, getState },
        ) => {
          console.log({ args });

          const store = getState();
          const tempId = crypto.randomUUID();
          // const newPost = {
          //   _id: tempId,
          //   likes: [],
          //   comments: [],
          //   content: args.get("content2"),
          //   author: {
          //     notifications: [],
          //     _id: store.auth.userInfo._id,
          //     fullName: store.auth.userInfo.fullName,
          //   },
          //   createdAt: new Date().toISOString(),
          //   updatedAt: new Date().toISOString(),
          //   __v: 0,
          // };

          const patchResult = dispatch(
            rootApi.util.updateQueryData("getPosts", "allPosts", (draft) => {
              const currentPost = draft.entities[args];
              if (currentPost) {
                currentPost.likes.push({
                  author: {
                    _id: store.auth.userInfo._id,
                    fullName: store.auth.userInfo.fullName,
                  },
                  _id: tempId,
                });
              }
            }),
          );

          try {
            const { data } = await queryFulfilled;
            console.log({ data });

            dispatch(
              rootApi.util.updateQueryData("getPosts", "allPosts", (draft) => {
                // console.log({draft});
                // draft.unshift(newPost);
                const currentPost = draft.entities[args];
                if (currentPost) {
                  currentPost.likes = currentPost.likes.map((like) => {
                    if (like._id === tempId) {
                      return {
                        author: {
                          _id: store.auth.userInfo._id,
                          fullName: store.auth.userInfo.fullName,
                        },
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        _id: data._id,
                      };
                    }

                    return like;
                  });
                  // let currentLike = currentPost.likes.find(
                  //   (like) => like._id === tempId,
                  // );

                  // if (currentLike) {
                  //   currentLike = {
                  //     author: {
                  //       _id: store.auth.userInfo._id,
                  //       fullName: store.auth.userInfo.fullName,
                  //     },
                  //     createdAt: data.createdAt,
                  //     updatedAt: data.updatedAt,
                  //     _id: data._id,
                  //   };
                  // }
                }
              }),
            );

            // dispatch(
            //   rootApi.util.updateQueryData(
            //     "getPosts",
            //     { limit: 10, offset: 0 },
            //     (draft) => {
            //       // console.log({draft});
            //       // draft.unshift(newPost);
            //       const index = draft.findIndex((post) => post._id === tempId);
            //       if (index !== -1) {
            //         draft[index] = data;
            //       }
            //     },
            //   ),
            // );
          } catch (err) {
            console.log({ err });
            patchResult.undo();
          }

          // console.log({ newPost });
        },
      }),
      unLikePost: builder.mutation({
        query: (postId) => {
          return {
            url: `/posts/${postId}/unlike`,
            method: "DELETE",
          };
        },
        // invalidatesTags: ["POSTS"],
      }),
    };
  },
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useUnLikePostMutation,
} = postApi;
