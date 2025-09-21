'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  LinearProgress,
} from '@mui/material';
import { Upload, CheckCircle, Cancel, CloudUpload } from '@mui/icons-material';
import Papa from 'papaparse';

interface CsvUploaderProps {
  onImport: (data: any[]) => void;
  onCancel?: () => void;
  showUploader?: boolean;
  onToggleUploader?: () => void;
}

export default function CsvUploader({ onImport, onCancel, showUploader = true, onToggleUploader }: CsvUploaderProps) {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file) return;

    setIsLoading(true);
    setError('');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setIsLoading(false);
        if (results.errors.length > 0) {
          setError('Error parsing CSV file. Please check the format.');
          return;
        }
        setCsvData(results.data as any[]);
      },
      error: (error) => {
        setIsLoading(false);
        setError(`Error reading file: ${error.message}`);
      },
    });

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      processFile(csvFile);
    } else {
      setError('Please drop a CSV file');
      setTimeout(() => setError(''), 3000);
    }
  }, [processFile]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmImport = () => {
    onImport(csvData);
    setCsvData([]);
  };

  const handleCancelImport = () => {
    setCsvData([]);
    setError('');
    onCancel?.();
  };

  if (!showUploader && csvData.length === 0) {
    return (
      <Button
        variant="outlined"
        startIcon={<Upload />}
        onClick={onToggleUploader}
      >
        Upload CSV File
      </Button>
    );
  }

  if (csvData.length === 0) {
    return (
      <Box>
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="csv-upload"
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
        
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            border: 2,
            borderStyle: 'dashed',
            borderColor: isDragOver ? 'primary.main' : 'divider',
            bgcolor: isDragOver ? 'primary.light' : 'background.paper',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.light',
            },
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <CloudUpload sx={{ fontSize: '3rem', color: 'text.secondary', mb: 2 }} />
          
          <Typography variant="h6" sx={{ mb: 1 }}>
            {isDragOver ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            or
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<Upload />}
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleUploadClick();
            }}
          >
            Browse Files
          </Button>
        </Paper>
        
        {isLoading && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Processing CSV file...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Supported format: CSV with columns like name, email, company, title, city, tags
        </Typography>
      </Box>
    );
  }

  const columns = Object.keys(csvData[0] || {});
  const previewData = csvData.slice(0, 5); // Show first 5 rows

  return (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Successfully parsed {csvData.length} rows. Preview below:
      </Alert>

      <Paper sx={{ overflow: 'hidden', mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} sx={{ fontWeight: 600 }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {previewData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>
                    {row[column] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {csvData.length > 5 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          ... and {csvData.length - 5} more rows
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={handleCancelImport}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<CheckCircle />}
          onClick={handleConfirmImport}
        >
          Confirm Import
        </Button>
      </Box>
    </Box>
  );
}