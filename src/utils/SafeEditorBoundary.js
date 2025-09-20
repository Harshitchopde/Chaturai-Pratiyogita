import { ErrorBoundary } from "react-error-boundary";

function SafeEditorBoundary({ children }) {
  const errorHandler = (error, info) => {
    console.error("Error: ",error,info)
    if (
      error?.type === "cancelation" ||
      error?.msg === "operation is manually canceled"
    ) {
      // Ignore Monaco cancelation errors
      return;
    }
    console.error("Editor crashed:", error, info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={() => <div>Something went wrong in the editor.</div>}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
}

export default SafeEditorBoundary;
