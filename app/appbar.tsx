import React from 'react';
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';

const AppBar: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', backgroundColor: 'Black', color: '#ffffff', height: '64px' }}>
      <div style={{ flexGrow: 1, fontSize: '1.25rem' }}>
        My Application
      </div>
      <div>
        <Button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginRight: '10px' }}>
          <BellIcon />
        </Button>
      </div>
    </div>
  );
};

export default AppBar;