import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <title>Welcome | TodoApp</title>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md text-center shadow-md">
          <CardContent className="py-12">
            <h1 className="text-3xl font-bold mb-4">Welcome</h1>
            <p className="text-gray-600 mb-6">
              A minimal, fast TODO app to help you stay on track. Login to manage your tasks.
            </p>
            <div className="flex flex-col gap-4">
              <Button size="lg" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};