import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useStudy } from '../store';

export default function NotFound() {
  const { state } = useStudy();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              {state.language === 'si' ? '404 පිටුව හමු නොවීය' : '404 Page Not Found'}
            </h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {state.language === 'si' ? 'මෙම පිටුව මෙහි නොමැත.' : 'This page is not available.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
