import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { expect, test, vi } from 'vitest';
import { demoData } from './fixtures/demoData';

test('renders App and navigates tabs', () => {
  render(<App {...demoData} />);
  expect(screen.getByText(/HAVEN/i)).toBeDefined();

  // Test Dashboard interactions
  const tempMinus = screen.getByText('-');
  const tempPlus = screen.getByText('+');
  fireEvent.click(tempMinus);
  fireEvent.click(tempPlus);
  
  fireEvent.click(screen.getByText('Home'));
  fireEvent.click(screen.getByText('Eco Mode'));

  const revealPin = screen.getByText('Reveal PIN');
  fireEvent.click(revealPin);
  fireEvent.click(screen.getByText('Hide Code'));

  // Open Chat
  fireEvent.click(screen.getByText(/Open Full Chat Window/i));
  const chatClose = screen.getByText('✕');
  fireEvent.click(chatClose);

  // Switch to Smart Tech Telemetry
  fireEvent.click(screen.getByText(/Smart Tech Telemetry/i));
  expect(screen.getByText(/Solar Panel & Inverter Maintenance/i)).toBeDefined();

  // Switch to Manuals
  fireEvent.click(screen.getByText(/Manuals & Warranties/i));
  expect(screen.getByText(/Appliance Manuals & PDF Downloads/i)).toBeDefined();

  // Click download pdf
  const downloadBtns = screen.getAllByText('Download PDF');
  // Need to mock window.alert
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  fireEvent.click(downloadBtns[0]);
  expect(alertMock).toHaveBeenCalled();
  alertMock.mockRestore();

  // Open Chat from Header or Sidebar
  fireEvent.click(screen.getByText(/Messages \(/i));
  
  // Test chat sending
  const input = screen.getByPlaceholderText(/Type a secure message/i);
  fireEvent.change(input, { target: { value: 'Hello' } });
  fireEvent.click(screen.getByText('Send'));
  
  // Test quick chips
  fireEvent.click(screen.getByText('+ What day is bin collection?'));
});
test('sidebar interactions', () => {
  render(<App {...demoData} />);
  fireEvent.click(screen.getByText(/Home Overview/i));
  fireEvent.click(screen.getByText(/Secure Buyer Chat/i));
});
