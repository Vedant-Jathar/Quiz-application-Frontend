import { AppRoutes } from "./routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from "./store"

function App() {
  const queryCLient = new QueryClient()
  
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryCLient}>
          <AppRoutes />
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
