import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar,
  Edit2,
  Save,
  X
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      firstName: '',
      lastName: '',
      phone: '',
      address: ''
    }
  });

  const onSubmit = async (data) => {
    // In a real app, you would update the user profile here
    console.log('Profile data:', data);
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.username}</h2>
                <p className="text-gray-600">{user?.email}</p>
                {user?.is_admin && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                    <Shield className="h-3 w-3 mr-1" />
                    Administrator
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member since</span>
                  <span className="text-gray-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="submit"
                      form="profile-form"
                      disabled={!isDirty}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        {...register('username', { 
                          required: 'Username is required',
                          minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters'
                          }
                        })}
                        type="text"
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user?.username}</span>
                      </div>
                    )}
                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user?.email}</span>
                      </div>
                    )}
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        {...register('firstName')}
                        type="text"
                        className="input-field"
                      />
                    ) : (
                      <div className="p-2">
                        <span className="text-gray-900">Not provided</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        {...register('lastName')}
                        type="text"
                        className="input-field"
                      />
                    ) : (
                      <div className="p-2">
                        <span className="text-gray-900">Not provided</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      {...register('phone')}
                      type="tel"
                      className="input-field"
                    />
                  ) : (
                    <div className="p-2">
                      <span className="text-gray-900">Not provided</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      {...register('address')}
                      rows={3}
                      className="input-field"
                    />
                  ) : (
                    <div className="p-2">
                      <span className="text-gray-900">Not provided</span>
                    </div>
                  )}
                </div>
              </form>

              {/* Account Settings */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <h4 className="font-medium text-gray-900">Change Password</h4>
                    <p className="text-gray-600 text-sm mt-1">Update your password regularly to keep your account secure</p>
                  </button>

                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <h4 className="font-medium text-gray-900">Notification Preferences</h4>
                    <p className="text-gray-600 text-sm mt-1">Manage how you receive notifications</p>
                  </button>

                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                    <p className="text-gray-600 text-sm mt-1">Control your privacy and data settings</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;