'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import UserDetailsDrawer from '@/components/users/UserDetailsDrawer';
import { mockUsers } from '@/data/users';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 600 }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 200,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 180,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: params.value === 'Active' ? 'success.light' : 'grey.300',
            color: params.value === 'Active' ? 'success.dark' : 'text.secondary',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'lastActive',
      headerName: 'Last Active',
      width: 120,
      valueFormatter: (params) => {
        return new Date(params).toLocaleDateString();
      },
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    setSelectedUser(params.row);
    setDrawerOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Users
      </Typography>

      <Paper sx={{ p: 3 }}>
        {/* Search */}
        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
        </Box>

        {/* Data Grid */}
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          onRowClick={handleRowClick}
          sx={{
            minHeight: 400,
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }}
        />
      </Paper>

      {/* User Details Drawer */}
      <UserDetailsDrawer
        open={drawerOpen}
        user={selectedUser}
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  );
}