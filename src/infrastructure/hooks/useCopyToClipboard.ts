import {
  useState,
  useRef,
  AriaAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";

type CopyToClipboardProps = {
  copyConfirmationProps: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  copyInputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

  onCopyButtonClick: () => void;
  textCopiedToClipboard: boolean;
};

const useCopyToClipboard = (textToCopy: string): CopyToClipboardProps => {
  const [textCopiedToClipboard, setTextCopiedToClipboard] =
    useState<boolean>(false);
  // For browsers that don't support navigator.clipboard, we need to add the email to an input, select it, and copy the value
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const showCopiedSuccessMessage = () => {
    setTextCopiedToClipboard(true);

    setTimeout(() => {
      setTextCopiedToClipboard(false);
    }, 2000);
  };

  const copyInputProps = {
    className: "screenReaderText",
    readOnly: true,
    ref: textInputRef,
    tabIndex: -1,
    type: "text",
    value: textToCopy,
    "aria-hidden": true,
  };

  const copyConfirmationProps = {
    "aria-live": "assertive" as AriaAttributes["aria-live"],
    "aria-relevant": "additions" as AriaAttributes["aria-relevant"],
  };

  const onCopyButtonClick = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(showCopiedSuccessMessage);
    } else {
      textInputRef?.current?.select();
      document.execCommand("copy");
      showCopiedSuccessMessage();
      textInputRef?.current?.blur();
    }
  };

  return {
    copyConfirmationProps,
    copyInputProps,
    onCopyButtonClick,
    textCopiedToClipboard,
  };
};

export default useCopyToClipboard;
