import React, { useState } from 'react';
import { Button, Input, Typography, Row, Col, Flex, ConfigProvider, theme } from 'antd';
import { FaEnvelope } from 'react-icons/fa';
import { darkTheme } from '../antd-theme';

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
  };

  return (
    <ConfigProvider theme={{ ...darkTheme, algorithm: theme.darkAlgorithm }}>
      <section id="contact" style={{ padding: '64px 16px', background: 'rgba(255, 255, 255, 0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Flex vertical gap={32}>
            <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
              Contact Me
            </Title>
            <Text style={{ fontSize: '1.125rem', textAlign: 'center', color: '#718096' }}>
              Let&apos;s chat 😊
            </Text>
            
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: 32,
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Row gutter={32}>
                <Col xs={24} md={8}>
                  <Flex vertical align="flex-start" gap={24}>
                    <Flex align="center" gap={12}>
                      <FaEnvelope style={{ color: '#3b82f6', fontSize: 24 }} />
                      <Title level={4} style={{ margin: 0 }}>
                        Get in Touch
                      </Title>
                    </Flex>
                    <Text style={{ marginBottom: 16 }}>
                      Interested in working together or have a question? Send me a message and I&apos;ll get back to you as soon as possible.
                    </Text>
                    <Text style={{ color: '#718096' }}>
                      Alternatively, you can contact me directly at{' '}
                      <Link href="mailto:javier.lim@u.nus.edu" style={{ color: '#3b82f6' }}>
                        javier.lim@u.nus.edu
                      </Link>
                    </Text>
                  </Flex>
                </Col>
                
                <Col xs={24} md={16}>
                  <form onSubmit={handleSubmit}>
                    <Flex vertical gap={24}>
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        size="large"
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        size="large"
                      />
                      <TextArea
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        style={{ ...inputStyle, resize: 'none' }}
                      />
                      <Button 
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        size="large"
                        block
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Flex>
                  </form>
                </Col>
              </Row>
            </div>
          </Flex>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default Contact;
