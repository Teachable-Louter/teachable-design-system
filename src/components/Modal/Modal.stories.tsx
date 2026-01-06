import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        {isOpen && (
          <Modal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            title="Modal Title"
          >
            <p>This is modal content</p>
          </Modal>
        )}
      </>
    );
  }
};

export const WithButtons: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        {isOpen && (
          <Modal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            title="Confirm Action"
            onConfirm={() => {
              alert('Confirmed!');
              setIsOpen(false);
            }}
            confirmText="Save"
            cancelText="Cancel"
          >
            <p>Are you sure you want to proceed?</p>
          </Modal>
        )}
      </>
    );
  }
};
