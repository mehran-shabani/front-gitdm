import { useApiClinicalReferencesList } from '../../api/generated/gitdmApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Loading } from '../../components/ui/Loading';
import { ErrorMessage } from '../../components/ui/ErrorMessage';
import { Eye, RefreshCw, Plus, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ClinicalReferencesList() {
  const { data, isLoading, error, refetch } = useApiClinicalReferencesList();

  if (isLoading) {
    return <Loading className="mt-8" size="lg" />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load clinical references"
        message={error.message}
        className="mt-8"
      />
    );
  }

  const references = data?.data || [];

  const getYearBadgeVariant = (year: number) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    
    if (age <= 2) return 'default'; // Recent
    if (age <= 5) return 'secondary'; // Fairly recent
    return 'outline'; // Older
  };

  const truncateTitle = (title: string, maxLength = 60) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Clinical References</CardTitle>
              <CardDescription>
                Access medical literature and clinical guidelines
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Link to="/clinical-references/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reference
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {references.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No clinical references found. Add your first reference to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {references.map((reference) => (
                  <TableRow key={reference.id}>
                    <TableCell className="font-medium">{reference.id}</TableCell>
                    <TableCell>
                      <div className="flex items-start gap-2 max-w-md">
                        <BookOpen className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="font-medium" title={reference.title}>
                          {truncateTitle(reference.title)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{reference.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getYearBadgeVariant(reference.year)}
                        className="flex items-center gap-1 w-fit"
                      >
                        <Calendar className="h-3 w-3" />
                        {reference.year}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{reference.topic}</Badge>
                    </TableCell>
                    <TableCell>
                      {reference.url ? (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">No URL</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/clinical-references/${reference.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}