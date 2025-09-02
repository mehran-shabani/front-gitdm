import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiAiSummariesCreate } from '../../api/generated/gitdmApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { SummaryTypeEnum } from '../../api/generated/gitdmApi.schemas';
import { Link } from 'react-router-dom';

export function CreateAISummary() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const createMutation = useApiAiSummariesCreate();

  const [formData, setFormData] = useState({
    patient_id: '',
    content: '',
    content_type_model: '',
    object_id: '',
    context: '',
    summary_type: 'medical_record' as SummaryTypeEnum,
    topic_hint: '',
    async_processing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.patient_id) {
      newErrors.patient_id = 'Patient ID is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createMutation.mutateAsync({
        data: {
          ...formData,
          patient_id: parseInt(formData.patient_id),
        },
      });

      addToast('success', 'AI Summary Created', 'The AI summary has been created successfully.');
      navigate('/ai-summaries');
    } catch (error) {
      addToast('error', 'Failed to create AI summary', 'Please try again later.');
      console.error('Failed to create AI summary:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/ai-summaries"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to AI Summaries
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create AI Summary</CardTitle>
          <CardDescription>
            Generate a new AI summary for medical content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patient_id">Patient ID *</Label>
              <Input
                id="patient_id"
                name="patient_id"
                type="number"
                value={formData.patient_id}
                onChange={handleChange}
                placeholder="Enter patient ID"
              />
              {errors.patient_id && (
                <p className="text-sm text-red-500">{errors.patient_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content to Summarize *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter the medical content to be summarized..."
                rows={6}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary_type">Summary Type</Label>
              <Select
                id="summary_type"
                name="summary_type"
                value={formData.summary_type}
                onChange={handleChange}
              >
                <option value="medical_record">Medical Record</option>
                <option value="encounter">Patient Encounter</option>
                <option value="lab_results">Laboratory Results</option>
                <option value="medications">Medications</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Additional Context</Label>
              <Textarea
                id="context"
                name="context"
                value={formData.context}
                onChange={handleChange}
                placeholder="Optional patient context for better summarization..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic_hint">Topic Hint</Label>
              <Input
                id="topic_hint"
                name="topic_hint"
                value={formData.topic_hint}
                onChange={handleChange}
                placeholder="e.g., diabetes, hypertension"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="async_processing"
                name="async_processing"
                checked={formData.async_processing}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="async_processing">
                Process asynchronously (recommended for large content)
              </Label>
            </div>

            {createMutation.error && (
              <ErrorMessage
                title="Submission Error"
                message={createMutation.error.message}
              />
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ai-summaries')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Summary
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}