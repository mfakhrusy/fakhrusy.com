import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { disableAppMenu as disableAppMenuAction } from "@/store/desktop";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export function DesktopShutdownModal({ isOpen, onClose }: Props) {
  const cancelRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  const disableAppMenu = useCallback<() => void>(
    () => dispatch(disableAppMenuAction()),
    []
  );

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Shutdown
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to shutdown the system?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                disableAppMenu();
                onClose();
                router.replace("/shutdown/process");
              }}
              ml={3}
            >
              Shutdown
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
