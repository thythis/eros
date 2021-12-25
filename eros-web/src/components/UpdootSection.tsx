import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
} from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadStatus, setLoadStatus] = useState<
    "updooting" | "downdooting" | "default"
  >("default");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="upvote"
        icon={<ChevronUpIcon />}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadStatus === "updooting"}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadStatus("updooting");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadStatus("default");
        }}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadStatus("downdooting");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadStatus("default");
        }}
        isLoading={loadStatus === "downdooting"}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downvote"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
